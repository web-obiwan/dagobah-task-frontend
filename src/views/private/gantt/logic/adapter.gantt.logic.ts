import type { Task, ApiGanttInterface } from '@/interface/gantt.interface.ts';
import { extractDateFromISO, calculateEndDate } from '@/utils/date.utils.ts';
import { extractIdFromUri } from '@/views/private/gantt/logic/id-generator.gantt.logic.ts';

/**
 * Adaptateur pour convertir les données de l'API vers le format Frappe Gantt
 */
export class GanttAdapter {
    /**
     * Convertit les données API en format Frappe Gantt
     * @param apiData Données de l'API
     * @returns Données au format Frappe Gantt
     */
    static apiToGanttFormat(apiData: ApiGanttInterface[]): Task[] {
        return apiData.map(item => this.convertSingleItem(item));
    }
    
    /**
     * Convertit un élément API en tâche Frappe Gantt
     * @param item Élément API
     * @returns Tâche au format Frappe Gantt
     */
    private static convertSingleItem(item: ApiGanttInterface): Task {
        // Extraire la date (YYYY-MM-DD) de la date ISO complète
        const startDate = extractDateFromISO(item.begunAt);
        
        // Définir une durée par défaut d'au moins 1 jour
        const duration = item.duration || 1;
        
        // Calculer la date de fin basée sur la date de début et la durée
        const endDate = calculateEndDate(startDate, duration);
        
        // Extraire les dépendances (relations parent-enfant)
        const dependencies = this.extractDependencies(item);
        
        // Convertir en format Task
        return {
            id: item.id?.toString() || extractIdFromUri(item['@id']),
            name: item.name,
            start: startDate,
            end: endDate,
            duration: duration,
            progress: item.progress, // Supposant que progress est déjà en pourcentage (0-100)
            dependencies: dependencies
        };
    }
    
    /**
     * Extrait les dépendances d'un élément API
     * @param item Élément API
     * @returns Liste des dépendances ou undefined
     */
    private static extractDependencies(item: ApiGanttInterface): string[] | undefined {
        if (!item.parent) return undefined;
        
        let parentId: string | undefined;
        
        if (typeof item.parent === 'string') {
            // Extraire l'ID de la référence (e.g., "/api/gantts/1" → "1")
            parentId = extractIdFromUri(item.parent);
        } else if (item.parent.id) {
            // Utiliser directement l'ID du parent
            parentId = item.parent.id.toString();
        } else if (item.parent['@id']) {
            // Extraire l'ID de @id
            parentId = extractIdFromUri(item.parent['@id']);
        }
        
        return parentId ? [parentId] : undefined;
    }
    
    /**
     * Convertit les données Frappe Gantt en format API
     * @param ganttData Données Frappe Gantt
     * @returns Données au format API (partiel, suffisant pour les mises à jour)
     */
    static ganttToApiFormat(ganttData: Task): Partial<ApiGanttInterface> {
        return {
            name: ganttData.name,
            begunAt: ganttData.start, // Ajouter T00:00:00.000Z si nécessaire
            duration: ganttData.duration,
            progress: ganttData.progress || 0
        };
    }
    
    /**
     * Prépare les données hiérarchiques pour l'affichage
     * @param apiData Données de l'API
     * @returns Données API avec relations parent-enfant résolues
     */
    static prepareHierarchicalData(apiData: ApiGanttInterface[]): ApiGanttInterface[] {
        // Créer une map pour accéder rapidement aux tâches par ID
        const taskMap = new Map<string, ApiGanttInterface>();
        
        // Premier passage: indexer toutes les tâches par ID
        apiData.forEach(task => {
            taskMap.set(task['@id'], {
                ...task,
                childs: task.childs || []
            });
        });
        
        // Deuxième passage: résoudre les références parent-enfant
        apiData.forEach(task => {
            // Traiter la référence parent si nécessaire
            if (task.parent && typeof task.parent === 'string') {
                const parentTask = taskMap.get(task.parent);
                if (parentTask) {
                    task.parent = parentTask;
                    
                    // Ajouter cette tâche à la liste des enfants du parent si ce n'est pas déjà fait
                    if (!parentTask.childs) {
                        parentTask.childs = [];
                    }
                    
                    // Vérifier si cet enfant est déjà dans la liste des enfants du parent
                    const alreadyInChilds = parentTask.childs.some(child => {
                        if (typeof child === 'object') {
                            return child['@id'] === task['@id'];
                        }
                        return child === task['@id'];
                    });
                    
                    if (!alreadyInChilds) {
                        parentTask.childs.push(task);
                    }
                }
            }
            
            // Résoudre les références dans le tableau childs
            if (task.childs && task.childs.length > 0) {
                task.childs = task.childs.map(child => {
                    if (typeof child === 'string') {
                        return taskMap.get(child) || child;
                    }
                    return child;
                });
            }
        });
        
        return apiData;
    }
    
    /**
     * Trie les tâches pour s'assurer que les parents viennent avant les enfants
     * @param tasks Tâches à trier
     * @returns Tâches triées
     */
    static sortTasksHierarchically(tasks: ApiGanttInterface[]): ApiGanttInterface[] {
        // Créer une map pour stocker la profondeur de chaque tâche
        const depthMap = new Map<string, number>();
        
        // Calculer la profondeur pour chaque tâche
        const calculateDepth = (task: ApiGanttInterface): number => {
            // Vérifier si la profondeur est déjà calculée
            if (depthMap.has(task['@id'])) {
                return depthMap.get(task['@id']) || 0;
            }
            
            // Si pas de parent, profondeur = 0
            if (!task.parent) {
                depthMap.set(task['@id'], 0);
                return 0;
            }
            
            // Obtenir le parent
            const parentId = typeof task.parent === 'string' ? task.parent : task.parent['@id'];
            const parentTask = tasks.find(t => t['@id'] === parentId);
            
            if (!parentTask) {
                depthMap.set(task['@id'], 0);
                return 0;
            }
            
            // Calculer la profondeur du parent et ajouter 1
            const depth = calculateDepth(parentTask) + 1;
            depthMap.set(task['@id'], depth);
            return depth;
        };
        
        // Calculer la profondeur pour toutes les tâches
        tasks.forEach(task => calculateDepth(task));
        
        // Trier par profondeur (croissante)
        return [...tasks].sort((a, b) => {
            const depthA = depthMap.get(a['@id']) || 0;
            const depthB = depthMap.get(b['@id']) || 0;
            return depthA - depthB;
        });
    }
    
    /**
     * Calcule les métriques pour les tâches parentes basées sur leurs enfants
     * @param parentTask Tâche parente
     */
    static updateParentTaskMetrics(parentTask: ApiGanttInterface): void {
        if (!parentTask.childs || parentTask.childs.length === 0) return;
        
        // Trouver la date de début la plus ancienne et la date de fin la plus récente
        let earliestStart: Date | null = null;
        let latestEnd: Date | null = null;
        let totalProgress = 0;
        
        parentTask.childs.forEach(child => {
            if (typeof child === 'object') {
                // Obtenir la date de début
                const childStart = new Date(child.begunAt);
                if (!earliestStart || childStart < earliestStart) {
                    earliestStart = childStart;
                }
                
                // Calculer la date de fin
                const childEnd = new Date(child.begunAt);
                childEnd.setDate(childEnd.getDate() + (child.duration || 0));
                if (!latestEnd || childEnd > latestEnd) {
                    latestEnd = childEnd;
                }
                
                // Somme des progrès
                totalProgress += child.progress || 0;
            }
        });
        
        // Mettre à jour la tâche parente si nous avons des dates valides
        if (earliestStart && latestEnd) {
            // Définir la date de début à la date de début la plus ancienne des enfants
            parentTask.begunAt = earliestStart.toISOString();
            
            // Calculer la durée comme différence entre début le plus ancien et fin la plus récente
            const diffTime = Math.abs(latestEnd.getTime() - earliestStart.getTime());
            parentTask.duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Moyenne des progrès sur tous les enfants
            parentTask.progress = Math.round(totalProgress / parentTask.childs.length);
        }
    }
}
