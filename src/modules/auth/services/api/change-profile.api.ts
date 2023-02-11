import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ProfileFormType } from '../../validations';
import type { MutationConfig } from '@/libs/react-query';
import type { IBaseResponse } from '@/types';

import { objToFormData, showErrorFromApi } from '@/libs/helpers';
import { makeRequest } from '@/libs/react-query';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';
import { allQueryKeysStore } from '@/services/query-keys-store';

const changeProfileRequest = (data: { user: ProfileFormType; id: number }) => {
  const { user, id } = data;

  const { avatar, ...restUser } = user;

  const newData = {
    user: restUser,
  };

  const formData = objToFormData(newData);

  if (avatar && avatar instanceof File) {
    formData.append('user[avatar]', avatar);
  } else {
    formData.delete('user[avatar]');
  }

  return makeRequest<typeof formData, IBaseResponse>({
    url: ALL_ENDPOINT_URL_STORE.auth.changeProfile(id),
    method: 'PATCH',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type ChangeProfileMutationOptionsType = {
  configs?: MutationConfig<typeof changeProfileRequest>;
};
export const useMutationChangeProfile = ({ configs }: ChangeProfileMutationOptionsType = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeProfileRequest,

    async onSuccess() {
      await queryClient.invalidateQueries(allQueryKeysStore.auth['current-user-infor']);
    },

    onError(error) {
      showErrorFromApi(error);
    },

    ...configs,
  });
};
