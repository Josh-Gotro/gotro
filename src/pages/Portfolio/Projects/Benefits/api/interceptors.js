import axios from "axios";
import { toast } from "react-toastify";

function ConfigureInterceptors(setValidationErrors) {
  // Create an axios instance
  const instance = axios.create();

  // Request interceptor
  instance.interceptors.request.use(
    (config) => config,
    (error) => {
      console.log("Request Error:", error);
      toast.error("An error occurred while sending the request", {
        position: "top-right",
        autoClose: 5000,
      });
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("Response Error:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let statusCode = error.response.status;

        if (statusCode >= 400 && statusCode < 500) {
          // Handle 400 range errors
          setValidationErrors(error.response.data?.validationErrors);
          toast.error("Validation error occurred", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          // Handle all other errors
          const errorMessage = `An unexpected error has occurred, please contact the DRB system administrator.`;
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
        toast.error(
          "An unexpected error has occurred, please contact the DRB system administrator.",
          {
            position: "top-right",
            autoClose: 5000,
          },
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up the request:", error.message);
        toast.error(
          "An unexpected error has occurred, please contact the DRB system administrator.",
          {
            position: "top-right",
            autoClose: 5000,
          },
        );
      }

      return Promise.reject(error);
    },
  );

  // Replace the global axios with our instance
  axios.interceptors.request = instance.interceptors.request;
  axios.interceptors.response = instance.interceptors.response;
}

export default ConfigureInterceptors;
