import toast from "react-hot-toast";
import { User } from "./types";

type FetcherOptions = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // Explicitly define allowed methods
  body?: Record<string, unknown>;  // Allow any JSON-serializable object
  json?: boolean;
}

type APIResponse<T> = { // Generic interface for typed API responses
  data: T;
}

export const fetcher = async <T = unknown>({ url, method, body, json = true }: FetcherOptions): Promise<T> => {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json' 
    },
    ...(body && { body: JSON.stringify(body) })
  });

  if (!res.ok) {
    const errorText = await res.text(); // Capture error message from the server

    if (res.status === 401) {
      toast.error("Your email or password is wrong");
    } else {
      toast.error(`API Error (${res.status}): ${errorText}`); 
      console.error(errorText);
    }

    throw new Error(`API Error (${res.status}): ${errorText}`); // Include status in error
  }

  if (json) {
    const data: APIResponse<T> = await res.json();
    return data.data;
  } else {
    return (await res.text()) as unknown as T; 
  }
};

export const register = (user: User) => {
    return fetcher({url: '/api/register', method: 'POST', body: user})
}

export const signin = (user: User) => {
    return fetcher({url: '/api/signin', method: 'POST', body: user})
}

export const createNewProject = (name: string) => {
    return fetcher({
      url: "/api/project",
      method: "POST",
      body: { name },
    });
};

export const editTaskStatus = (taskId: string, newStatus: string) => {
    return fetcher({
        url: "/api/task",
        method: "PUT",
        body: {
            taskId: taskId,       // Provide the taskId
            newStatus: newStatus, // Provide the newStatus
        },
    });
};

export const deleteTask = (taskId: string) => {
    return fetcher({
        url: "/api/deleteTask",
        method: "DELETE",
        body: { taskId },
    });
};

export const createTask = (name: string, projectId: string, description: string, taskId: string) => {
    return fetcher({
        url: "/api/createTask",
        method: "POST",
        body: { name, projectId, description, taskId },
    });
};

export const editTask = (name: string, projectId: string, description: string, taskId: string) => {
    return fetcher({
        url: "/api/editTask",
        method: "PUT",
        body: { name, projectId, description, taskId },
    });
};
  