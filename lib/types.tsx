export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  password: string;
}

export type Project = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  ownerId: string;
  description: string | null;
  due: Date | null;
  deleted: boolean;
  tasks: Task[];
}

export type Task = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  name: string;
  ownerId?: string;
  projectId: string;
  description: string;
  due?: Date | null;
  deleted: boolean;
}

export type TaskStatus = 'STARTED' | 'COMPLETED' | 'NOT_STARTED'

export type TaskProps = {
  task: Task;
  handleDeleteTask: (id: string, status: string) => Promise<void>;
  openModal: (task?: Task) => void;
}

export type HeaderProps = {
  text: string;
  count: number
}

export type SectionProps = {
  status: TaskStatus;
  tasks: Task[];
  changeTaskStatus: (id: string, status: string) => Promise<void>;
  handleDeleteTask: (id: string, status: string) => Promise<void>;
  openModal: (task?: Task) => void;
}
