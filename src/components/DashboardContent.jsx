import React from "react";
import Card from "./Card";

const DashboardContent = () => {
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
      description:
        "Email: Yes, send email to NkJ@gmail.com\nMailing Address: Not Specified",
      buttons: [{ text: "Edit" }],
    },
    {
      title: "Wish List Archive",
      description: "Refer to your old wish lists.",
      buttons: [{ text: "View Archive" }],
    },
    {
      title: "Account Details",
      description: `Name: Niloofar Koochakian Jazi\nEmail: kouchakian.niloofar@gmail.com\nPassword: ********\nPhone: 437.955.9545\nLanguage: English\nSaved Address: Not Specified`,
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
