declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  interface User {
    _id: string;
    name: string;
    email: string;
    active: boolean;
    role: "USER" | "ADMIN";
  }
  
  interface ApiResponse<T> {
    data: T;
    message: string;
    sucess: boolean
  }

  // types.d.ts

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
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
  showJob: boolean;
}


export interface JobQuery {
  title?: string;
  city?: string;
  jobType?: string;
  jobCountry?: string;
}

  
