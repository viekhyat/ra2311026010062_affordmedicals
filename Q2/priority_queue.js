const WEIGHTS = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

const getPriority = (notification) => {
    const weight = WEIGHTS[notification.Type] || 0;
    const timestamp = new Date(notification.Timestamp).getTime();
    return { weight, timestamp };
};

const comparePriority = (a, b) => {
    const priorityA = getPriority(a);
    const priorityB = getPriority(b);

    if (priorityA.weight !== priorityB.weight) {
        return priorityA.weight - priorityB.weight;
    }
    return priorityA.timestamp - priorityB.timestamp;
};

class MinHeap {
    constructor(maxSize) {
        this.heap = [];
        this.maxSize = maxSize;
    }

    insert(notification) {
        if (this.heap.length < this.maxSize) {
            this.heap.push(notification);
            this.bubbleUp(this.heap.length - 1);
        } else if (comparePriority(notification, this.heap[0]) > 0) {
            this.heap[0] = notification;
            this.bubbleDown(0);
        }
    }

    bubbleUp(index) {
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (comparePriority(this.heap[index], this.heap[parentIndex]) >= 0) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        const length = this.heap.length;
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && comparePriority(this.heap[leftChild], this.heap[smallest]) < 0) {
                smallest = leftChild;
            }
            if (rightChild < length && comparePriority(this.heap[rightChild], this.heap[smallest]) < 0) {
                smallest = rightChild;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    getTopNotifications() {
        return [...this.heap].sort((a, b) => comparePriority(b, a));
    }
}

export const processNotificationsStream = (notificationsStream) => {
    const minHeap = new MinHeap(10);
    for (const notification of notificationsStream) {
        minHeap.insert(notification);
    }
    return minHeap.getTopNotifications();
};
