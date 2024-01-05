import axiosInstance from "../../utils/axios";

export const getTransaction = async () => {
  try {
    const response = await axiosInstance.get("/transactions");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addTransaction = async (data) => {
  try {
    const response = await axiosInstance.post("/transactions", data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const editTransaction = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/transactions/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
