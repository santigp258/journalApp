import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry mt-1">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png)",
        }}
      ></div>

      <div className="journal__entry-body">
          <p className="journal__entry-title">
              A new day
          </p>
          <div className="journal__entry-content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum veniam repellendus velit eaque tempora et illo doloremque nostrum esse eius.
          </div>
      </div>
      <div className="journal__entry-date-box">
          <span>Monday</span>
            <h4>28</h4>          
      </div>
    </div>
  );
};
