import { NonEnumerable } from '../Toolkit/Decorators';
import TwitchClient from 'twitch';

export interface PubSubRedemptionMessageData {
	data: {
		timestamp: string;
		redemption: {
			id: string;
			reward: {
				id: string;
				channel_id: string;
				title: string;
				prompt: string;
				cost: number;
				is_user_input_required: boolean;
				is_sub_only: boolean;
			};
			user: {
				id: string;
				display_name: string;
			};
			channel_id: string;
			redeemed_at: string;
			user_input?: string;
			status: 'FULFILLED' | 'UNFULFILLED';
		};
	};
}

/**
 * A message that informs about a user subscribing to a channel.
 */
export default class PubSubRedemptionMessage {
	// @ts-ignore We stash this for future use:
	@NonEnumerable private readonly _twitchClient: TwitchClient;

	/** @private */
	constructor(private readonly _data: PubSubRedemptionMessageData, twitchClient: TwitchClient) {
		this._twitchClient = twitchClient;
	}

	get rewardId() {
		return this._data.data.redemption.reward.id;
	}

	get redemptionId() {
		return this._data.data.redemption.id;
	}

	get userInput() {
		return this._data.data.redemption.user_input;
	}

	get userId() {
		return this._data.data.redemption.user.id;
	}

	get userName() {
		return this._data.data.redemption.user.display_name;
	}
}
