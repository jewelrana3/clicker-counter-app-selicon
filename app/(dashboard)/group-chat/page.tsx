"use client";
import TotalChatGroupCard from "@/components/pages/groupChat/GroupChatCard";
import GroupChatTable from "@/components/pages/groupChat/GroupChatTable";
import React, { useCallback, useEffect, useState } from "react";
import { getGroupChatOverviewAction } from "@/app/actions/getGroupChatOverviewAction";
import { getGroupChatsAction } from "@/app/actions/getGroupChatsAction";
import toast from "react-hot-toast";

export default function GroupChatPage() {
  const [overview, setOverview] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchOverview = useCallback(async () => {
    setOverviewLoading(true);
    try {
      const res = await getGroupChatOverviewAction();
      if (res.success) {
        setOverview(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to fetch group chat overview.");
    } finally {
      setOverviewLoading(false);
    }
  }, []);

  const fetchChats = useCallback(async () => {
    setChatsLoading(true);
    try {
      const res = await getGroupChatsAction({ page, limit: 10 });
      if (res.success) {
        setChats(res.data || []);
        setTotalPage(res.pagination?.totalPage || 1);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to fetch group chats.");
    } finally {
      setChatsLoading(false);
    }
  }, [page]);

  const refreshData = useCallback(() => {
    fetchOverview();
    fetchChats();
  }, [fetchOverview, fetchChats]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div className="space-y-6">
      <TotalChatGroupCard data={overview} loading={overviewLoading} />
      <GroupChatTable
        data={chats}
        loading={chatsLoading}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        refreshData={refreshData}
      />
    </div>
  );
}
