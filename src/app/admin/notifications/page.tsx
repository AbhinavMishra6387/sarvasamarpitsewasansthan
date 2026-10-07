"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, Heart, Users, Award, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "DONATION",
    title: "New 80G Donation of ₹25,000 Received",
    desc: "Amitabh Srivastava donated via Bank Transfer for Winter Blanket Seva. Receipt #SSSS-2026-RCP-1085 issued.",
    time: "2 hours ago",
    read: false,
    link: "/admin/donations",
  },
  {
    id: "notif-2",
    type: "VOLUNTEER",
    title: "New Volunteer Application: Dr. Ananya Mishra",
    desc: "Qualified physician applied for Sunday Medical Camps. Verification required.",
    time: "5 hours ago",
    read: false,
    link: "/admin/volunteers",
  },
  {
    id: "notif-3",
    type: "MEMBERSHIP",
    title: "New Life Patron Member: Satya Prakash Tripathi",
    desc: "Life membership granted. Digital card #SSSS-LIFE-00108 generated with QR code.",
    time: "Yesterday",
    read: true,
    link: "/admin/memberships",
  },
  {
    id: "notif-4",
    type: "SYSTEM",
    title: "Daily Database Backup Archive Completed",
    desc: "Automated snapshot backup generated and encrypted at 00:00 UTC.",
    time: "1 day ago",
    read: true,
    link: "/admin/system-health",
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Admin Notification &amp; Alert Center
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time push alerts for new donations, incoming volunteer registrations, and membership updates.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-bold transition-all self-start sm:self-auto shadow-sm"
        >
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          let Icon = Bell;
          let badgeColor = "bg-gray-100 text-gray-800";
          if (n.type === "DONATION") {
            Icon = Heart;
            badgeColor = "bg-orange-100 text-ngo-orange-800";
          } else if (n.type === "VOLUNTEER") {
            Icon = Users;
            badgeColor = "bg-blue-100 text-blue-800";
          } else if (n.type === "MEMBERSHIP") {
            Icon = Award;
            badgeColor = "bg-emerald-100 text-emerald-800";
          }

          return (
            <div
              key={n.id}
              className={`p-5 rounded-lg border transition-all flex items-start justify-between gap-4 ${
                n.read ? "bg-white border-gray-200" : "bg-orange-50/50 border-orange-200 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg shrink-0 ${badgeColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${badgeColor}`}>
                      {n.type}
                    </span>
                    <span className="text-[11px] text-gray-400">{n.time}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-gray-900 mt-1">
                    {n.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {n.desc}
                  </p>
                </div>
              </div>

              <Link
                href={n.link}
                className="px-3.5 py-1.5 rounded-md bg-gray-100 hover:bg-ngo-orange hover:text-white text-gray-700 text-xs font-bold transition-colors shrink-0 flex items-center gap-1 self-center"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
