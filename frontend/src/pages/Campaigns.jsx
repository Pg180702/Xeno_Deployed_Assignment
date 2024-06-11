import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Campaign_Card from "../components/Campaign_Card";
const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch(
        `https://xeno-deployed-assignment.onrender.com/api/v1/users/get-campaigns/${localStorage.getItem(
          "user-id"
        )}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setCampaigns(data.data);
      }
    };
    fetchCampaigns();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        marginTop: "3rem",
      }}
    >
      <Box>
        {campaigns.length === 0 ? (
          <div>No campaigns Yet</div>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            {campaigns.map((c) => (
              <Campaign_Card id={c._id} data={c} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Campaigns;
