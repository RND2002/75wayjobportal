// // JobCard.tsx
// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// export interface Job {
//   _id: string;
//   companyName: string;
//   jobTitle: string;
//   expectedSalary: number;
//   jobCity: string;
//   jobType: string;
//   jobState: string;
//   jobCountry: string;
//   qualifications: string[];
//   showJob: boolean;
// }

// interface JobCardProps {
//   job: Job;
// }

// const JobCard: React.FC<JobCardProps> = ({ job }) => {
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   return (
//     <>
//       {/* Compact Card View */}
//       <Card variant="outlined" sx={{ mb: 2, maxWidth: 400, mx: "auto", p: 1 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             {job.jobTitle}
//           </Typography>
//           <Typography variant="subtitle2" color="textSecondary">
//             {job.companyName}
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             {job.jobCity}, {job.jobState}
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             Salary: ${job.expectedSalary.toLocaleString()}
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             {job.jobType}
//           </Typography>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#0077B5",
//                 color: "#fff",
//                 textTransform: "none",
//               }}
//             >
//               Apply
//             </Button>
//             <Button
//               variant="text"
//               onClick={handleOpenDialog}
//               sx={{ textTransform: "none" }}
//             >
//               Show More
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Dialog for Detailed View */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>
//           {job.jobTitle} - {job.companyName}
//         </DialogTitle>
//         <DialogContent dividers>
//           <Typography variant="body1" gutterBottom>
//             <strong>Location:</strong> {job.jobCity}, {job.jobState}, {job.jobCountry}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Salary:</strong> ${job.expectedSalary.toLocaleString()}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Type:</strong> {job.jobType}
//           </Typography>
//           <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
//             <strong>Qualifications:</strong>
//           </Typography>
//           <List dense>
//             {job.qualifications.map((qual, index) => (
//               <ListItem key={index} disablePadding>
//                 <ListItemText primary={`- ${qual}`} />
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#0077B5",
//               color: "#fff",
//               textTransform: "none",
//             }}
//           >
//             Apply
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default JobCard;
// CompanyCard.tsx
// JobCard.tsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Helper function to get up to 2 initials from company name
function getInitials(name?: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);
}

export interface Job {
  _id: string;
  companyName: string;
  jobTitle: string;
  expectedSalary: number;
  jobCity: string;
  jobType: string;
  jobState: string;
  jobCountry: string;
  qualifications: string[];
  // Optionally, include showJob if needed
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const initials = getInitials(job.companyName);

  return (
    <>
      {/* Compact Card View */}
      <Card variant="outlined" sx={{ mb: 2, width: 250, m: 1 }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={1}>
            <Avatar sx={{ bgcolor: "#0077B5", width: 48, height: 48 }}>
              {initials}
            </Avatar>
          </Box>
          <Typography variant="subtitle1" align="center" noWrap>
            {job.companyName}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            {job.jobTitle}
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Salary: ${job.expectedSalary.toLocaleString()}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="outlined" size="small" onClick={handleOpenDialog}>
              View More
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Popup Dialog for full details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{job.companyName}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            {job.jobTitle}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Salary:</strong> ${job.expectedSalary.toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {job.jobCity}, {job.jobState}, {job.jobCountry}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Job Type:</strong> {job.jobType}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
            Qualifications:
          </Typography>
          <List dense>
            {job.qualifications.map((qual, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`- ${qual}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0077B5", color: "#fff", textTransform: "none" }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobCard;

