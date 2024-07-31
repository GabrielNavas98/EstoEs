'use client';
import React, { useState, useMemo } from 'react';
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
import { VerticalDotsIcon } from '@/icons/VerticalDotsIcon';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { columns } from '../../data/data';
import useProjectsStore from '@/store/useProjectsStore';
import Swal from 'sweetalert2';

const statusColorMap: Record<string, ChipProps['color']> = {
  ENABLED: 'success',
  DISABLED: 'danger',
};

export default function CustomTable() {
  const router = useRouter();
  const { projectsData, deleteProject } = useProjectsStore();
  const [filterValue, setFilterValue] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(1);

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

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    await Swal.fire({
      title: 'Estas seguro de querer borrar el proyecto?',
      text: 'No podras recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(id);
      }
    });
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
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.uid}
                  className="py-3 px-5 border-b text-left hidden md:table-cell"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100 ">
                {/* name */}
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                  <p className="text-default-800">{item.name}</p>
                  <span className="text-default-400 text-sm">
                    Creation Date: {formatDate(item.createdAt)}
                  </span>
                  <dl className="md:hidden">
                    <dt className="sr-only">Assigned To</dt>
                    <dd>
                      <User
                        avatarProps={{
                          radius: 'full',
                          size: 'sm',
                          src: item.designatedAvatar,
                        }}
                        classNames={{
                          description: 'text-default-500',
                        }}
                        name={item.assignedTo}
                      >
                        {item.assignedTo}
                      </User>
                    </dd>
                  </dl>
                </td>
                {/* manager */}
                <td className="hidden md:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                  <User
                    avatarProps={{
                      radius: 'full',
                      size: 'sm',
                      src: item.avatarManager,
                    }}
                    classNames={{
                      description: 'text-default-500',
                    }}
                    name={item.manager}
                  >
                    {item.manager}
                  </User>
                </td>
                {/* designated */}
                <td className="hidden md:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                  <User
                    avatarProps={{
                      radius: 'full',
                      size: 'sm',
                      src: item.designatedAvatar,
                    }}
                    classNames={{
                      description: 'text-default-500',
                    }}
                    name={item.assignedTo}
                  >
                    {item.assignedTo}
                  </User>
                </td>
                {/* Status */}
                <td className="hidden md:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                  <Chip
                    className="capitalize border-none gap-1 text-default-600"
                    color={statusColorMap[item.status.toUpperCase()]}
                    size="sm"
                    variant="dot"
                  >
                    {item.status}
                  </Chip>
                </td>
                {/* Actions */}
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
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
                          onClick={() => router.push(`/projectForm/${item.id}`)}
                        >
                          <div className="flex items-center gap-2">
                            <EditIcon />
                            Edit
                          </div>
                        </DropdownItem>
                        <DropdownItem
                          textValue="Delete"
                          onClick={() => void handleDelete(item.id)}
                        >
                          <div className="flex items-center gap-2">
                            <DeleteIcon />
                            Delete
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-2 flex justify-center">
        <button
          className={`px-4 py-2 border rounded ${page === 1 ? 'hidden' : ''}`}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          className={`px-4 py-2 border rounded ${
            page === pages ? 'hidden' : ''
          }`}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
