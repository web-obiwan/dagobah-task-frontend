/**
 * Loads the Frappe Gantt library from CDN
 * This includes both CSS and JavaScript files
 * @returns Promise that resolves when loading is complete
 */
export const loadFrappeGantt = async (): Promise<void> => {
    // Check if already loaded
    if (window.Gantt) {
        console.log('Frappe Gantt already loaded');
        return Promise.resolve();
    }
    
    return new Promise<void>((resolve) => {
        // Load CSS
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdn.jsdelivr.net/npm/frappe-gantt@0.6.1/dist/frappe-gantt.css';
        document.head.appendChild(linkElement);
        
        // Load JavaScript
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://cdn.jsdelivr.net/npm/frappe-gantt@0.6.1/dist/frappe-gantt.min.js';
        scriptElement.onload = () => {
            console.log('Frappe Gantt loaded successfully');
            resolve();
        };
        scriptElement.onerror = (error) => {
            console.error('Failed to load Frappe Gantt:', error);
            resolve(); // Resolve anyway to prevent blocking the application
        };
        document.head.appendChild(scriptElement);
    });
};

/**
 * Initializes a Gantt chart with the given configuration
 * @param container HTML element to contain the Gantt chart
 * @param tasks Array of tasks to display
 * @param config Configuration options for the Gantt chart
 * @returns Gantt chart instance or null if initialization failed
 */
export const initializeGantt = (
    container: HTMLElement,
    tasks: any[],
    config: any
): any => {
    if (!window.Gantt) {
        console.error('Frappe Gantt not loaded');
        return null;
    }
    
    if (!container) {
        console.error('Container element not found');
        return null;
    }
    
    if (!tasks || tasks.length === 0) {
        console.warn('No tasks to display');
        return null;
    }
    
    try {
        return new window.Gantt(container, tasks, config);
    } catch (error) {
        console.error('Error initializing Gantt chart:', error);
        return null;
    }
};
