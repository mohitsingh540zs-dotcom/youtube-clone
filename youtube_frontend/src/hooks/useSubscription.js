import { useEffect, useState } from "react";
import {
  subscribeStatus,
  subscribeChannel,
  unsubscribeChannel,
} from "../api/subscription";

const useSubscription = (channelId) => {
  const [subscribed, setSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState(0);

  useEffect(() => {
    if (!channelId) return;

    const fetchStatus = async () => {
      try {
        const data = await subscribeStatus(channelId);

        setSubscribed(data.subscribed);
        setSubscribers(data.subscribers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatus();
  }, [channelId]);

  const toggleSubscription = async () => {
    try {
      let data;

      if (subscribed) {
        data = await unsubscribeChannel(channelId);
      } else {
        data = await subscribeChannel(channelId);
      }

      setSubscribed(data.subscribed);
      setSubscribers(data.subscribers);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    subscribed,
    subscribers,
    toggleSubscription,
  };
};

export default useSubscription;
