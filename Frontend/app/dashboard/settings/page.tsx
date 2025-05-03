"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard/header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      avatar: "JD",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Member",
      avatar: "JS",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "Member",
      avatar: "RJ",
    },
  ])
  const [selectedMember, setSelectedMember] = useState<null | {
    id: string
    name: string
    email: string
    role: string
    avatar: string
  }>(null)
  const [showManageDialog, setShowManageDialog] = useState(false)
  const [editedMember, setEditedMember] = useState<{
    name: string
    email: string
    role: string
  } | null>(null)
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Inc.",
    role: "CTO",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailSummary: true,
    modelAlerts: true,
    billingNotifications: true,
    marketingEmails: false,
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleManageMember = (member: typeof teamMembers[0]) => {
    setSelectedMember(member)
    setEditedMember({
      name: member.name,
      email: member.email,
      role: member.role,
    })
    setShowManageDialog(true)
  }

  const handleUpdateMember = () => {
    if (!selectedMember || !editedMember) return

    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id
          ? {
              ...member,
              name: editedMember.name,
              email: editedMember.email,
              role: editedMember.role,
            }
          : member
      )
    )

    toast({
      title: "Team member updated",
      description: `${editedMember.name}'s details have been updated successfully.`,
    })
    setShowManageDialog(false)
  }

  const handleRemoveMember = () => {
    if (!selectedMember) return

    setTeamMembers((prev) => prev.filter((member) => member.id !== selectedMember.id))
    toast({
      title: "Team member removed",
      description: `${selectedMember.name} has been removed from the team.`,
    })
    setShowManageDialog(false)
  }

  return (
    <div>
      <DashboardHeader title="Settings" description="Manage your account settings and preferences" />

      <Tabs defaultValue="profile" className="mb-8">
        <TabsList className="mb-6 bg-gray-700">
          <TabsTrigger value="profile" className="text-white data-[state=active]:bg-electric-blue">
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-electric-blue">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="text-white data-[state=active]:bg-electric-blue">
            Security
          </TabsTrigger>
          <TabsTrigger value="team" className="text-white data-[state=active]:bg-electric-blue">
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={profileForm.company}
                      onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-white">
                      Job Title
                    </Label>
                    <Input
                      id="role"
                      value={profileForm.role}
                      onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-electric-blue hover:bg-electric-blue/90 text-white"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-summary" className="font-medium text-white">
                          Weekly Usage Summary
                        </Label>
                        <p className="text-sm text-gray-300">
                          Receive a weekly summary of your API usage and model performance
                        </p>
                      </div>
                      <Switch
                        id="email-summary"
                        checked={notificationSettings.emailSummary}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, emailSummary: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="model-alerts" className="font-medium text-white">
                          Model Alerts
                        </Label>
                        <p className="text-sm text-gray-300">
                          Get notified about model updates, performance issues, or downtime
                        </p>
                      </div>
                      <Switch
                        id="model-alerts"
                        checked={notificationSettings.modelAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, modelAlerts: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="billing-notifications" className="font-medium text-white">
                          Billing Notifications
                        </Label>
                        <p className="text-sm text-gray-300">
                          Receive invoices, payment confirmations, and billing alerts
                        </p>
                      </div>
                      <Switch
                        id="billing-notifications"
                        checked={notificationSettings.billingNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            billingNotifications: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing-emails" className="font-medium text-white">
                          Marketing Emails
                        </Label>
                        <p className="text-sm text-gray-300">
                          Stay updated with product news, tips, and special offers
                        </p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            marketingEmails: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNotificationUpdate}
                    className="bg-electric-blue hover:bg-electric-blue/90 text-white"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-white">
                      Current Password
                    </Label>
                    <Input id="current-password" type="password" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-white">
                      New Password
                    </Label>
                    <Input id="new-password" type="password" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Manage team members who have access to your Modela™ account.</p>
                  <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white">Invite Team Member</Button>
                </div>

                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold mr-3">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{member.name}</h4>
                          <p className="text-sm text-gray-300">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-white">{member.role}</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-600 hover:bg-gray-600 text-white"
                          onClick={() => handleManageMember(member)}
                        >
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showManageDialog} onOpenChange={setShowManageDialog}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Manage Team Member</DialogTitle>
          </DialogHeader>
          {selectedMember && editedMember && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="member-name" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="member-name"
                    value={editedMember.name}
                    onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="member-email"
                    value={editedMember.email}
                    onChange={(e) => setEditedMember({ ...editedMember, email: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-role" className="text-white">
                    Role
                  </Label>
                  <Select 
                    value={editedMember.role}
                    onValueChange={(value) => setEditedMember({ ...editedMember, role: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={handleRemoveMember}
            >
              Remove Member
            </Button>
            <Button
              className="w-full sm:w-auto bg-electric-blue hover:bg-electric-blue/90"
              onClick={handleUpdateMember}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
