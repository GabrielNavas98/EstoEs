'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  ChipProps,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '@/components/icons/VerticalDotsIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { columns } from '../../data/data';
import useProjectsStore from '@/data/useProjectsStore';
import { Project } from '@/types/projectTypes';

const statusColorMap: Record<string, ChipProps['color']> = {
  ENABLED: 'success',
  DISABLED: 'danger',
};

export default function CustomTable() {
  const router = useRouter();
  const { projectsData } = useProjectsStore();
  let loading = false;
  const [filterValue, setFilterValue] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(1);

  useEffect(() => {
    loading = true;
  }, [projectsData]);

  const pages = Math.ceil(projectsData.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredProjects = [...projectsData];

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter((project) =>
        project.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProjects;
  }, [projectsData, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderCell = useCallback(
    (project: Project, columnKey: React.Key): React.ReactNode => {
      const cellValue = project[columnKey as keyof Project];

      switch (columnKey) {
        case 'info':
          return (
            <>
              <p className="text-default-800">{project.name}</p>
              <span className="text-default-400">
                {formatDate(project.createdAt)}
              </span>
            </>
          );
        case 'manager':
          return (
            <User
              avatarProps={{
                radius: 'full',
                size: 'sm',
                src: project.avatarManager,
              }}
              classNames={{
                description: 'text-default-500',
              }}
              name={cellValue as string}
            >
              {project.manager}
            </User>
          );
        case 'designated':
          return (
            <User
              avatarProps={{
                radius: 'full',
                size: 'sm',
                src: project.designatedAvatar,
              }}
              classNames={{
                description: 'text-default-500',
              }}
              description={project.assignedTo}
              name={cellValue as string}
            >
              {project.assignedTo}
            </User>
          );
        case 'status':
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[project.status.toUpperCase()]}
              size="sm"
              variant="dot"
            >
              {cellValue as string}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex align-middle items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    radius="full"
                    size="sm"
                    variant="light"
                    aria-label="More actions"
                  >
                    <VerticalDotsIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Actions menu">
                  <DropdownItem
                    textValue="Edit"
                    onClick={() =>
                      void router.push(`/projectForm/${project.id}`)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <EditIcon />
                      Edit
                    </div>
                  </DropdownItem>
                  <DropdownItem textValue="Delete">
                    <div className="flex items-center gap-2">
                      <DeleteIcon />
                      Delete
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return;
      }
    },
    []
  );

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col md:flex-row justify-between mb-5">
        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded px-3 py-2 mb-3 md:mb-0 w-full md:max-w-md"
          value={filterValue}
          onChange={onSearchChange}
        />
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            className="border rounded p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200 w-full">
          <thead className="hidden md:table-header-group">
            <tr>
              {columns.map((column) => (
                <th key={column.uid} className="py-3 px-5 border-b text-left">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-100 flex flex-col md:table-row"
              >
                {columns.map((column) => (
                  <td
                    key={column.uid}
                    className="py-3 px-5 flex flex-col md:table-cell"
                  >
                    <span className="font-bold md:hidden">{column.name}</span>
                    {renderCell(item, column.uid)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-2 flex justify-center">
        <button
          className="px-4 py-2 border rounded"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          className="px-4 py-2 border rounded"
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
