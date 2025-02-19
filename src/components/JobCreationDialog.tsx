import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateJobMutation } from "../services/jobApi";


// Define the job form data structure
interface JobFormData {
  companyName: string;
  jobTitle: string;
  expectedSalary: number;
  jobCity: string;
  jobType: string;
  jobState: string;
  jobCountry: string;
  qualifications: string; // comma separated string input
  showJob: boolean;
}

interface JobCreationDialogProps {
  open: boolean;
  onClose: () => void;
}

const JobCreationDialog: React.FC<JobCreationDialogProps> = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<JobFormData>({
    defaultValues: {
      companyName: "",
      jobTitle: "",
      expectedSalary: 0,
      jobCity: "",
      jobType: "Full-time",
      jobState: "",
      jobCountry: "",
      qualifications: "",
      showJob: true,
    },
  });

  // Mutation hook for creating a job
  const [createJob, { isLoading }] = useCreateJobMutation();

  const onSubmit = async (data: JobFormData) => {
    try {
      // Convert comma-separated qualifications string into an array
      const qualificationsArray = data.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter((q) => q !== "");

      const payload = {
        ...data,
        qualifications: qualificationsArray,
      };

      await createJob(payload).unwrap();
      toast.success("Job created successfully!");
      reset();
      onClose();
    } catch (error: any) {
        console.log(error)
      toast.error(error?.data?.message || "Failed to create job");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Job</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Company Name" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Job Title" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="expectedSalary"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Expected Salary"
                type="number"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="jobCity"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Job City" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Job Type" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="jobState"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Job State" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="jobCountry"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Job Country" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="qualifications"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Qualifications (comma separated)"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="showJob"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} />}
                label="Show Job"
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={isLoading}>
          Create Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobCreationDialog;
