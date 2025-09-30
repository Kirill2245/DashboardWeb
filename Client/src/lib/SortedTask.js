export const sortTasksByStatus = (tasks) => {
        const sorted = {
            Pending: [],
            Running: [],
            Review: [],
            Done: []
        };

        tasks.forEach(task => {
            const status = task.data?.status || 'Pending';
            
            if (Object.prototype.hasOwnProperty.call(sorted, status)) {
                sorted[status].push(task);
            } else {
                sorted.Pending.push(task);
            }
        });

        return sorted
    };