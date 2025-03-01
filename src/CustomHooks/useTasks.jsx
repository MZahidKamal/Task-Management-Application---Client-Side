import { useContext } from "react";
import AuthContext from "@/Providers/AuthContext.jsx";
import useAxiosSecure from "@/CustomHooks/useAxiosSecure.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import { toast } from "react-toastify";


const UseTasks = ({ taskId = '' }) => {


    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();



    const { mutateAsync: saveNewTaskToDatabase, isLoading: addTaskIsLoading, isError: addTaskIsError, error: addTaskError } = useMutation({
        mutationFn: async (newTaskObject) => {
            if (!user) {
                toast.error("User not logged in");
                return null;
            }
            if (!newTaskObject) {
                toast.error("No task object provided");
                return null;
            }
            // console.log(newTaskObject);
            try {
                const response = await axiosSecure.post(
                    `/tasks/create_new_task`,
                    { userEmail: user?.email, newTaskObj: newTaskObject }
                );
                if (response?.data?.status === 201) {
                    await refetchAllMyTaskIds();
                    toast.success(response?.data?.message);
                }
                else toast.error(response?.data?.message || "Failed to add task");
            }
            catch (error) {
                toast.error(`Failed to add task. Error: ${error?.code}: ${error?.message}`);
                throw error;
            }
        },
    });



    const {data: allCategories, isLoading: categoriesIsLoading, refetch: refetchAllCategories} = useQuery({
        queryKey: ['allCategories'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/categories/get_all_categories`)
            return response.data?.data || []
        },
    });



    const {data: allMyTaskIds, isLoading: allMyTaskIdsIsLoading, refetch: refetchAllMyTaskIds} = useQuery({
        queryKey: ['allMyTaskIds', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `/tasks/all_my_task_ids`,
                {params: {userEmail: user?.email}})
            return response?.data?.data || []
        },
        enabled: !!user?.email
    });



    const {data: taskDetails, isLoading: taskDetailsIsLoading, refetch: refetchTaskDetails} = useQuery({
        queryKey: ['taskDetails', user?.email, taskId],
        queryFn: async () => {
            const response = await axiosSecure.get(`/tasks/tasks_details_by_id`,
                {params: {userEmail: user?.email, taskId: taskId}}
            );
            // console.log(response?.data?.data);
            return response?.data?.data || [];
        },
        enabled: !!user?.email && !!taskId
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
                    await refetchAllMyTaskIds();
                    toast.success(response?.data?.message);
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
                    await refetchAllMyTaskIds();
                    toast.success(response?.data?.message);
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
                    await refetchAllMyTaskIds();
                    toast.success(response?.data?.message);
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



    return {
        saveNewTaskToDatabase, addTaskIsLoading, addTaskIsError, addTaskError,
        allCategories, categoriesIsLoading, refetchAllCategories,
        allMyTaskIds, allMyTaskIdsIsLoading, refetchAllMyTaskIds,
        taskDetails, taskDetailsIsLoading, refetchTaskDetails,
        saveUpdatedTaskToDatabase,
        deleteATaskFromDatabase,
        updateTaskCategoryIntoDatabase
    };
};


export default UseTasks;
