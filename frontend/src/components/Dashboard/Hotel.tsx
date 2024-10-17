import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import {
  fetchHotelsRequest,
  fetchPendingHotelsFailure,
  fetchPendingHotelsRequest,
  softDeleteHotelRequest,
  updateHotelStatusRequest,
} from "@/Redux/slices/hotelSlice";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Modal,
  Pagination,
  Tooltip,
  ModalContent,
  ModalFooter,
  ModalBody,
  Selection,
} from "@nextui-org/react";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { SearchIcon } from "@/assets/svg/SearchIcon";
import { ChevronDownIcon } from "@/assets/svg/ChevronDownIcon";
import { PlusIcon } from "@/assets/svg/PlusIcon";
import { DeleteIcon } from "@/assets/svg/DeleteIcon";
import { EyeIcon } from "@/assets/svg/EyeIcon";
import { EditIcon } from "@/assets/svg/EditIcon";
import { Cross } from "@/assets/svg/Cross";
import { Tick } from "@/assets/svg/Tick";
import { HotelForm } from "./HotelForm";
import { Hotel as HotelType } from "@/types/hotel/hotelPayload";
import Router from "next/router";

const Hotel = () => {
  const dispatch = useAppDispatch();
  const { hotels } = useAppSelector((state: RootState) => state.hotel);
  const pendingHotels = useAppSelector(
    (state: RootState) => state.hotel.pendingHotels
  );
  const user = useAppSelector((state: RootState) => state.user.user);
  const [data, setData] = useState<HotelType[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("hotel");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  // const [page, setPage] = useState<number>(1);
  const [paginationData, setPaginationData] = useState({
    current: 1,
    totalPage: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("DESC");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // const [isAccept]
  const [updatePendingStatus, setUpdatePendingStatus] = useState<string>("");
  const [selectedPendingHotelId, setSelectedPendingHotelId] =
    useState<string>();
  const [pendingHotelsData, setPendingHotelsData] = useState<HotelType[]>([]);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "approve") {
      dispatch(
        fetchPendingHotelsRequest({
          page: currentPage,
        })
      );
    } else {
      dispatch(
        fetchHotelsRequest({
          page: currentPage,
          ownerId: user?.id,
          keyword: searchKeyword,
          sortBy: sortBy,
          sortOrder,
        })
      );
    }
  }, [
    selectedTab,
    dispatch,
    searchKeyword,
    sortBy,
    sortOrder,
    user?.id,
    currentPage,
  ]);

  useEffect(() => {
    if (hotels) {
      setData(hotels.data);
      setTotalPages(hotels.totalPages);
    }
  }, [hotels]);

  useEffect(() => {
    if (pendingHotels) {
      setPendingHotelsData(pendingHotels.data);
      setTotalPages(pendingHotels.totalPages);
    }
  }, [pendingHotels]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openUpdateStatusModal = () => setIsUpdateStatusModalOpen(true);
  const closeUpdateStatusModal = () => setIsUpdateStatusModalOpen(false);
  const handlePageChange = (page: number) => {
    console.log("Pagination page changed: ", page);
    setCurrentPage(page);
  };

  const handleSortBySelection = (key: Selection) => {
    const selectedValue = Array.from(key).join("");
    setSortBy(selectedValue);
  };

  const handleSortOrderSelection = (key: Selection) => {
    const selectedValue = Array.from(key).join("");
    setSortOrder(selectedValue === "High to Low" ? "DESC" : "ASC");
  };

  // Open the delete confirmation modal
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // Close the delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openViewModal = () => {
    console.log("t his is view modal calinnnngndkgldkjfdjlk");
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleDeleteHotel = () => {
    if (selectedHotelId) {
      dispatch(softDeleteHotelRequest(selectedHotelId));
      closeDeleteModal();
      closeModal();
    }
  };

  const handleUpdateHotelStatus = () => {
    dispatch(
      updateHotelStatusRequest({
        id: selectedPendingHotelId ?? "",
        status: updatePendingStatus,
      })
    );
    closeUpdateStatusModal();
  };

  return (
    <div className="">
      <Tabs
        aria-label="Options"
        selectedKey={selectedTab}
        onSelectionChange={(key) => {
          setSelectedTab(key as string);
        }}
      >
        <Tab key="hotel" title="Hotel">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 justify-between items-end">
              <div className="flex gap-2">
                <Input
                  isClearable
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search by name..."
                  startContent={<SearchIcon />}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />

                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      variant="flat"
                    >
                      Filter
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Sort Column"
                    selectionMode="single"
                    closeOnSelect
                    disallowEmptySelection
                    onSelectionChange={(key) => handleSortBySelection(key)}
                  >
                    <DropdownItem key="name">Name</DropdownItem>
                    <DropdownItem key="price">Price</DropdownItem>
                    <DropdownItem key="hotelStarRating">Rating</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      variant="flat"
                    >
                      Sort by
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Sort Order"
                    selectionMode="single"
                    closeOnSelect
                    disallowEmptySelection
                    onSelectionChange={(key) => handleSortOrderSelection(key)}
                  >
                    <DropdownItem key="High to Low">High to Low</DropdownItem>
                    <DropdownItem key="Low to High">Low to High</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Button
                color="primary"
                endContent={<PlusIcon />}
                onClick={() => {
                  setEdit(false);
                  setIsViewModalOpen(false);
                  openModal();
                }}
              >
                Add New
              </Button>
            </div>
          </div>
          {user?.role === "PROVIDER" && (
            <Table className="mt-2">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Rating</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No Data Found">
                {data.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>{hotel.name}</TableCell>
                    <TableCell className="line-clamp-1">
                      {hotel.description}
                    </TableCell>
                    <TableCell>{hotel.hotelStarRating}</TableCell>
                    <TableCell>{hotel.price}</TableCell>
                    <TableCell>{hotel.registrationStatus}</TableCell>
                    <TableCell>
                      <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                              openModal(),
                                setSelectedHotelId(hotel.id),
                                setIsModalOpen(true),
                                setEdit(false);
                            }}
                          >
                            <EyeIcon />
                          </span>
                        </Tooltip>
                        <Tooltip content="Edit">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                              setEdit(true);
                              openModal();
                              setSelectedHotelId(hotel.id);
                            }}
                          >
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => {
                              setSelectedHotelId(hotel.id),
                                setIsDeleteModalOpen(true);
                            }}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {user?.role === "ADMIN" && (
            <Table className="mt-2">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Rating</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No Data Found">
                {data.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>{hotel.name}</TableCell>
                    <TableCell className="line-clamp-1">
                      {hotel.description}
                    </TableCell>
                    <TableCell>{hotel.hotelStarRating}</TableCell>
                    <TableCell>{hotel.price}</TableCell>
                    <TableCell>
                      <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                              openViewModal(),
                                setSelectedHotelId(hotel.id),
                                setIsModalOpen(true);
                            }}
                          >
                            <EyeIcon />
                          </span>
                        </Tooltip>
                        <Tooltip content="Edit">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                              setEdit(true);
                              openModal();
                              setSelectedHotelId(hotel.id);
                            }}
                          >
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => {
                              setSelectedHotelId(hotel.id),
                                setIsDeleteModalOpen(true);
                            }}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Tab>

        {user?.role === "ADMIN" && (
          <Tab key="approve" title="Approve">
            <Table className="mt-2">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Owner</TableColumn>
                <TableColumn>Rating</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No Data Found">
                {pendingHotelsData.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>{hotel.name}</TableCell>
                    <TableCell className="line-clamp-1">
                      {hotel.description}
                    </TableCell>
                    <TableCell>{hotel.owner.email}</TableCell>
                    <TableCell>{hotel.hotelStarRating}</TableCell>
                    <TableCell>{hotel.price}</TableCell>
                    <TableCell>
                      <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                              openViewModal(),
                                setIsViewModalOpen(true),
                                setSelectedPendingHotelId(hotel.id);
                            }}
                          >
                            <EyeIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Reject">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => {
                              openUpdateStatusModal(),
                                setUpdatePendingStatus("REJECTED");
                              setSelectedPendingHotelId(hotel.id);
                            }}
                          >
                            <Cross />
                          </span>
                        </Tooltip>
                        <Tooltip color="success" content="Accept">
                          <span
                            className="text-lg text-success cursor-pointer active:opacity-50"
                            onClick={() => {
                              openUpdateStatusModal();
                              setUpdatePendingStatus("ACCEPTED");
                              setSelectedPendingHotelId(hotel.id);
                            }}
                          >
                            <Tick />
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Tab>
        )}
      </Tabs>
      {isModalOpen && edit  ? (
        <HotelForm
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          isEdit={edit}
          id={selectedHotelId}
          isView={false}
        />
      ) : (
        <HotelForm
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          isEdit={false}
          id={selectedHotelId}
          isView={true}
        />
      )}
      <div className="mt-5 flex justify-center">
        {hotels && hotels?.totalPages > 0 && (
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            variant="flat"
            page={currentPage}
            total={totalPages}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <ModalContent>
            <ModalBody>
              <h3>Are you sure you want to delete this hotel?</h3>
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeDeleteModal}>Cancel</Button>
              <Button color="danger" onClick={handleDeleteHotel}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {isViewModalOpen && (
        <HotelForm
          isModalOpen={isViewModalOpen}
          closeModal={closeViewModal}
          isEdit={false}
          id={selectedPendingHotelId}
          isView={true}
        />
      )}

      {isUpdateStatusModalOpen && (
        <Modal
          isOpen={isUpdateStatusModalOpen}
          onClose={closeUpdateStatusModal}
          placement="top-center"
        >
          <ModalContent>
            <ModalBody>
              {updatePendingStatus === "ACCEPTED"
                ? "Do you want to accept this hotel?"
                : "Do you want to reject this hotel?"}
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeUpdateStatusModal}>Cancel</Button>
              <Button
                color={
                  updatePendingStatus === "ACCEPTED" ? "success" : "danger"
                }
                onClick={handleUpdateHotelStatus}
              >
                {updatePendingStatus === "ACCEPTED" ? "Accept" : "Reject"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Hotel;
