import toast from "react-hot-toast";

export const fetcher = async ({url, method, body, json = true}) => {
    const res = await fetch(url, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        ...(body && { body: JSON.stringify(body) }) // Only include the body if one is provided
    })

    if (!res.ok) {
        if (res.status === 401) {
            toast.error("Your email or password is wrong")
        }
        //handle your errors
        throw new Error("API Error")
    } 

    if (json) {
        const data = await res.json()
        return data.data;
    }
}

export const register = (user) => {
    return fetcher({url: '/api/register', method: 'POST', body: user})
}

export const signin = (user) => {
    return fetcher({url: '/api/signin', method: 'POST', body: user})
}

export const createNewProject = (name) => {
    return fetcher({
      url: "/api/project",
      method: "POST",
      body: { name },
    });
};

export const editTaskStatus = (taskId, newStatus) => {
    return fetcher({
        url: "/api/task",
        method: "PUT",
        body: {
            taskId: taskId,       // Provide the taskId
            newStatus: newStatus, // Provide the newStatus
        },
    });
};

export const deleteTask = (taskId) => {
    return fetcher({
        url: "/api/deleteTask",
        method: "DELETE",
        body: { taskId },
    });
};

export const createTask = (name, projectId, description, taskId) => {
    return fetcher({
        url: "/api/createTask",
        method: "POST",
        body: { name, projectId, description, taskId },
    });
};

export const editTask = (name, projectId, description, taskId) => {
    return fetcher({
        url: "/api/editTask",
        method: "PUT",
        body: { name, projectId, description, taskId },
    });
};
  