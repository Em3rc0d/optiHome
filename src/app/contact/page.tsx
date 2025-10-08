"use client";

import { useState } from "react";
import FinalCTA from "../finalCTA/page";
import ContactFormModal from "../finalCTA/ContactFormModal";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openForm = () => setIsModalOpen(true);
  const closeForm = () => setIsModalOpen(false);

  return (
    <>
      <FinalCTA onOpen={openForm} />
      <ContactFormModal isOpen={isModalOpen} onClose={closeForm} />
    </>
  );
};

export default Page;
