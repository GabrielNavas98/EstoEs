import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { projectsData as initialData } from './data';

interface Project {
    id: string;
    name: string;
    createdAt: Date;
    manager: string;
    avatarManager: string;
    assignedTo: string;
    designatedAvatar: string;
    status: string;
    description: string;
}

interface ProjectsState {
    projectsData: Project[];
    addProject: (newProject: Project) => void;
    updateProject: (updatedProject: Project) => void;
    getProjectById: (id: string) => Project | undefined;
    deleteProject: (id: string) => void;
}

const useProjectsStore = create<ProjectsState>()(
    persist(
        (set, get) => ({
            projectsData: initialData,
            addProject: (newProject) =>
                set((state) => ({
                    projectsData: [...state.projectsData, newProject],
                })),
            updateProject: (updatedProject) =>
                set((state) => ({
                    projectsData: state.projectsData.map((project) =>
                        project.id === updatedProject.id ? updatedProject : project
                    ),
                })),
            deleteProject: (id: string) =>
                set((state) => ({
                    projectsData: state.projectsData.filter((project) => project.id !== id),
                })),
            getProjectById: (id: string) => {
                const { projectsData } = get();
                return projectsData.find((project) => project.id === id);
            },
        }),
        {
            name: 'projects-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useProjectsStore;
