import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dataService from "../libs/dataService";

export const useGetVideos = () => {
  return useQuery({
    queryKey: ["getVideos"],
    queryFn: () => dataService.getVideos(),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dataService.setNote,
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: ["videoNotes", variables.youtubeId],
      });
    },
  });
};

export const useUpdateVideoName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dataService.updateVideoName,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["getVideos"],
      });
    },
  });
};
