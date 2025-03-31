export interface Channel {
    channelName: string | null;
    description: string | null;
    creatorName: string | null
}

export const EMPTY_CHANNEL: Channel = {
    channelName: null,
    description: null,
    creatorName: null
}
