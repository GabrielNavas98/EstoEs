export interface Project {
    id: number;
    name: string;
    createdAt: Date;
    manager: string;
    avatarManager: string;
    assignedTo: string;
    designatedAvatar: string;
    status: 'Enabled' | 'Disabled';
}
export interface ProjectsContextValue {
    projectsData: Project[];
    addProject: (newProject: Project) => void;
}