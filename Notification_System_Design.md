# Stage 1

## Notification System Design

To efficiently maintain the top 10 most important unread notifications from a continuous stream, I have implemented a Min-Heap (Priority Queue) data structure.

### Approach
1. **Priority Calculation**: Each notification is assigned a priority score based on its type and timestamp. The weight is calculated as:
   - Placement: 3
   - Result: 2
   - Event: 1
   The timestamp is also factored in to ensure more recent notifications of the same type get higher priority.

2. **Min-Heap Maintenance**: We use a Min-Heap of size 10. 
   - For every new unread notification, we compare it with the root of the Min-Heap (which represents the notification with the lowest priority among the top 10).
   - If the new notification has a higher priority than the root, we remove the root and insert the new notification.
   - If the heap has fewer than 10 elements, we simply insert the new notification.

### Efficiency
- **Time Complexity**: Inserting a new notification into a heap of size `k=10` takes `O(log k)` time. Since `k` is a small constant (10), the insertion time is `O(1)`. This makes it highly efficient for a continuous stream of notifications.
- **Space Complexity**: The heap only stores 10 notifications at any given time, resulting in an `O(1)` space complexity relative to the total number of notifications.

This approach guarantees that we always have the top 10 highest-priority unread notifications readily available without needing to sort the entire list of notifications.
