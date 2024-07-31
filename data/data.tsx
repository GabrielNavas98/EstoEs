const columns = [
  { name: 'Project info', uid: 'info' },
  { name: 'Project Manager', uid: 'manager' },
  { name: 'Assigned to', uid: 'designated' },
  { name: 'Status', uid: 'status' },
  { name: 'Action', uid: 'actions' },
];

const projectsData = [
  {
    id: '1',
    name: 'Landing page Esto es',
    createdAt: new Date(),
    manager: 'Walt Cosani',
    avatarManager: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    assignedTo: 'Ignacio Truffa',
    designatedAvatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    status: 'Enabled',
    description: 'Projectos de prueba',
  },
  {
    id: '2',
    name: 'Challenge FrontEnd',
    createdAt: new Date(),
    manager: 'Walt Cosani',
    avatarManager: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    assignedTo: 'Ignacio Truffa',
    designatedAvatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    status: 'Enabled',
    description: 'Projectos de prueba',
  },
  {
    id: '3',
    name: 'Landing page',
    createdAt: new Date(),
    manager: 'Walt Cosani',
    avatarManager: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    assignedTo: 'Ignacio Truffa',
    designatedAvatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    status: 'Enabled',
    description: 'Projectos de prueba',
  },
];
const managers = [
  {
    id: 1,
    name: 'Navas Carlos Gabriel',
  },
  {
    id: 2,
    name: 'Messi Lionel Andres',
  },
  {
    id: 3,
    name: 'Jhon Doe',
  },
  {
    id: 4,
    name: 'Lionel Scaloni',
  },
  {
    id: 5,
    name: 'Bernardo Ariel',
  },
  { id: 6, name: 'Walt Cosani' },
];

const developers = [
  {
    id: 1,
    name: 'Navas Carlos Gabriel',
  },
  {
    id: 2,
    name: 'Messi Lionel Andres',
  },
  {
    id: 3,
    name: 'Jhon Doe',
  },
  {
    id: 4,
    name: 'Lionel Scaloni',
  },
  {
    id: 5,
    name: 'Ignacio Truffa',
  },
];

export { columns, projectsData, managers, developers };
