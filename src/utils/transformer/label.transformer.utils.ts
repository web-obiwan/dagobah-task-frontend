export const labelStyles: Record<string, string> = {
  'feature': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'bug': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'security': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'design': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'ui': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  'backend': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'api': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  'testing': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'setup': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  'maintenance': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export const getLabelStyle = (label: string): string => {
  return labelStyles[label.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
};
