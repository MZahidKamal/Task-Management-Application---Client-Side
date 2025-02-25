import PropTypes from "prop-types";
import {useContext} from "react";
import DataContext from "./DataContext.jsx";
import AuthContext from "./AuthContext.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import useAxiosSecure from "../CustomHooks/useAxiosSecure.jsx";


const DataProvider = ({children}) => {


    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();


    const {data: allCategories, isLoading: allCategoriesLoading} = useQuery({
        queryKey: ['allCategories'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/categories/get_all_categories`);
            // console.log(response?.data?.data);
            return response?.data?.data || [];
        }
    });


    const { mutateAsync: saveNewTaskToDatabase } = useMutation({
        mutationFn: async (newTask) => {
            if (!user?.email) {
                toast.error("User not logged in");
                return;
            }
            try {
                const response = await axiosSecure.post(
                    `/tasks/create_new_task`,
                    { userEmail: user?.email, newTaskObj: newTask }
                );
                if (response?.data?.status === 201) {
                    toast.success(response?.data?.message);
                    await refetchAllMyTasks();
                } else {
                    toast.error(response?.data?.message || "Failed to add task");
                }
            } catch (error) {
                toast.error(`Failed to add task. Error: ${error?.code}: ${error?.message}`);
            }
        },
    });


    const {data: allMyTasks, isLoading: allMyTasksLoading, refetch: refetchAllMyTasks} = useQuery({
        queryKey: ['allMyTasks', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/tasks/all_my_tasks`,
                {params: {userEmail: user?.email}}
            );
            // console.log(response?.data?.data);
            return response?.data?.data || [];
        },
        enabled: !!user?.email
    });


    const { mutateAsync: saveUpdatedTaskToDatabase } = useMutation({
        mutationFn: async (updatedTaskObj) => {
            if (!user?.email) {
                toast.error("User not logged in");
                return;
            }
            try {
                const response = await axiosSecure.patch(
                    `/tasks/update_a_task`,
                    { userEmail: user?.email, updatedTaskObj: updatedTaskObj }
                );
                if (response?.data?.status === 200) {
                    toast.success(response?.data?.message);
                    await refetchAllMyTasks();
                } else if (response?.data?.status === 404) {
                    toast.error(response?.data?.message);
                } else if (response?.data?.status === 403) {
                    toast.error(response?.data?.message);
                } else {
                    toast.error(response?.data?.message || "Failed to update task");
                }
            } catch (error) {
                toast.error(`Failed to update task. Error: ${error.code}: ${error.message}`);
                throw error;
            }
        },
    });


    const { mutateAsync: deleteATaskFromDatabase } = useMutation({
        mutationFn: async (taskId) => {
            if (!user?.email) {
                toast.error("User not logged in");
                return;
            }
            try {
                const response = await axiosSecure.delete(
                    `/tasks/delete_one_of_my_task`,
                    {params: {userEmail: user?.email, taskId: taskId}}
                );
                // console.log(response?.data);
                if (response?.data?.status === 200) {
                    toast.success(response?.data?.message);
                    await refetchAllMyTasks();
                } else if (response?.data?.status === 404) {
                    toast.error(response?.data?.message);
                } else {
                    toast.error("Failed to delete task");
                }
            } catch (error) {
                toast.error(`Failed to delete task. Error: ${error.code}: ${error.message}`);
                throw error;
            }
        },
    });


    const { mutateAsync: updateTaskCategoryIntoDatabase } = useMutation({
        mutationFn: async ({taskId, categoryId}) => {
            if (!user?.email) {
                toast.error("User not logged in");
                return;
            }
            try {
                const response = await axiosSecure.patch(
                    `/tasks/update_task_position_in_category`,
                    { userEmail: user?.email, taskId: taskId, categoryId: categoryId }
                );
                if (response?.data?.status === 200) {
                    toast.success(response?.data?.message);
                    await refetchAllMyTasks();
                } else if (response?.data?.status === 404) {
                    toast.error(response?.data?.message);
                } else if (response?.data?.status === 403) {
                    toast.error(response?.data?.message);
                } else {
                    toast.error(response?.data?.message || "Failed to update task category");
                }
            } catch (error) {
                toast.error(`Failed to update task category. Error: ${error.code}: ${error.message}`);
                throw error;
            }
        },
    });


    const dataInfo = {
        allCategories,
        allCategoriesLoading,
        saveNewTaskToDatabase,
        allMyTasks,
        allMyTasksLoading,
        refetchAllMyTasks,
        saveUpdatedTaskToDatabase,
        deleteATaskFromDatabase,
        updateTaskCategoryIntoDatabase
    };


    return (
        <div>
            <DataContext.Provider value={dataInfo}>
                {children}
            </DataContext.Provider>
        </div>
    );
};


DataProvider.propTypes = {
    children: PropTypes.node,
}

export default DataProvider;
