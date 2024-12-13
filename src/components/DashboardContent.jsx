
import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";


const DashboardContent = ({ userData }) => {
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleViewArchiveClick = () => {
    navigate("/WishlistPage");  // Navigate to the WishlistPage when the button is clicked
  };
  const cardData = [
    {
      title: "Order History",
      description: "You have no order history",
      buttons: [{ text: "Learn more!" }],
    },
    {
      title: "My Points",
      description: "Earn 5 points on almost every dollar spent.",
      buttons: [{ text: "Learn more!" }],
    },
    {
      title: "Payment Options",
      description:
        "Set up a preferred payment option to enjoy faster checkout.",
      buttons: [
        { text: "Set Up Payment Option" },
        { text: "Manage Cards", type: "secondary" },
      ],
    },
    {
      title: "Email Preferences",
      description: userData ? (
        <>
          <div>Email: {userData.email ? "Yes" : "No"}</div>
          <div>Send email to: {userData.email || "Not available"}</div>
          <div>Mailing Address: {userData.mailingAddress || "Not Specified"}</div>
        </>
      ) : (
        "Loading email preferences..."
      ),
      buttons: [{ text: "Edit" }],
    },
    {
      title: "WishList Archive",
      description: "Refer to your old wish lists.",
      buttons: [{ text: "View Archive", onClick: handleViewArchiveClick }],
    },
    {
      title: "Account Details",
      description: userData ? (
        <>
          <div>Name: {userData.name}</div>
          <div>Email: {userData.email}</div>
          <div>Phone: {userData.phone || "Not available"}</div>
          <div>Language: English</div>
          <div>Saved Address: {userData.address || "Not Specified"}</div>
        </>
      ) : (
        "Loading account details..."
      ),
      buttons: [{ text: "Edit" }],
    },
  ];

  return (
    <main className="main-content">
      <div className="card-container">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            buttons={card.buttons}
          />
        ))}
      </div>
    </main>
  );
};

export default DashboardContent;
