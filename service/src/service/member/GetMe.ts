import HttpClient from '../../apis/HttpClient.tsx';
import { API_ENDPOINTS } from '../../constants/api.ts';
import { MembersMeResponse } from '../../types/member.type.ts';

export const getMe = async () => (await HttpClient.get<MembersMeResponse>(API_ENDPOINTS.ME)).data;
