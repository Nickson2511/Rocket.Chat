import i18next from 'i18next';

import { getDateFnsLocale } from './locale';

export const normalizeAgent = (agentData) => agentData && { name: agentData.name, username: agentData.username, status: agentData.status };

export const normalizeQueueAlert = async (queueInfo) => {
	if (!queueInfo) {
		return;
	}
	const formatDistance = await import('date-fns/formatDistance');
	const { spot, estimatedWaitTimeSeconds } = queueInfo;
	const locale = getDateFnsLocale();
	const estimatedWaitTime =
		estimatedWaitTimeSeconds && formatDistance(new Date().setSeconds(estimatedWaitTimeSeconds), new Date(), { locale });
	return (
		spot > 0 &&
		(estimatedWaitTime
			? i18next.t('your_spot_is_spot_estimated_wait_time_estimatedwai', { spot, estimatedWaitTime })
			: i18next.t('your_spot_is_spot', { spot }))
	);
};
