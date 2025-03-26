export interface Channel {
    channelName: string;
    description: string;
    creatorName: string
}

export const EMPTY_CHANNEL: Channel = {
    channelName: '',
    description: '',
    creatorName: ''
}
