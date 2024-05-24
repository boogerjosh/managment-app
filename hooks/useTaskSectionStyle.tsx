import { useDrop } from 'react-dnd';
import { Task, TaskStatus } from '../lib/types';

export const useTaskSectionStyle = (status: TaskStatus, addItemSection: (id: string) => Promise<void>) => {
  let text = 'To Do';

  if (status === 'STARTED') {
    text = 'In Progress';
  }

  if (status === 'COMPLETED') {
    text = 'Completed';
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: Task) => addItemSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return { text, isOver, drop };
};