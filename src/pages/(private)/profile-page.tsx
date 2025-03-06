import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Calendar, CreditCard, User2, Edit, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router"
import { RouteEnum } from "@/lib/enum/router-enum"
import { deserializeImage } from "@/lib/utils/Image"
import LoadingScreen from "../(public)/loading"
import { useAuth } from "@/context/auth-context"

export default function ProfilePage() {

    const navigate = useNavigate();
    const { me } = useAuth();

    return (
        me === null ? <LoadingScreen text="Fetching data" /> :
            <div className="container min-h-screen bg-background from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
                <div className="mx-auto">
                    {/* Header Section */}
                    <div className="relative w-full h-64 md:h-80 rounded-xl mb-24 bg-primary-to-accent">
                        <div className="absolute -bottom-16 left-8 md:left-12">
                            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl">
                                <AvatarFallback className="bg-primary text-4xl">{me?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                <AvatarImage src={deserializeImage(me?.profilePicture ?? [])} alt={me?.username} />
                            </Avatar>
                        </div>
                        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2">
                            <Button size="sm" variant="outline" className="bg-background backdrop-blur-sm text-foreground hover:bg-background/80" onClick={() => navigate(RouteEnum.EDIT_PROFILE)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit Profile
                            </Button>
                            <Button size="sm" variant="outline" className="bg-background backdrop-blur-sm text-foreground hover:bg-background/80">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: User Info and Balance */}
                        <div className="space-y-6">
                            {/* User Info */}
                            <Card className="border-none shadow-md">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-3xl font-bold">{me?.username}</CardTitle>
                                            <CardDescription className="flex items-center gap-1 mt-1">
                                                <User2 className="h-4 w-4" /> {me?.gender}
                                            </CardDescription>
                                        </div>
                                        <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">{me?.nationality}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4 mt-4">
                                        <h3 className="text-lg font-semibold">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 p-2 rounded-full">
                                                    <Mail className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Email</p>
                                                    <p className="font-medium">{me?.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 p-2 rounded-full">
                                                    <Calendar className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                                                    <p className="font-medium">{me?.dob}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 p-2 rounded-full">
                                                    <MapPin className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Nationality</p>
                                                    <p className="font-medium">{me?.nationality}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Balance Card */}
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Balance</CardTitle>
                                    <CardDescription>Your current account balance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-primary-to-accent-hover rounded-xl p-6 text-white">
                                        <p className="text-white/80 mb-1">Available to Lend</p>
                                        <p className="text-3xl font-bold font-mono">${me?.balance}</p>
                                        <Separator className="my-4 bg-white/20" />
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-white/80 text-sm">Total amount lent</p>
                                                <p className="font-medium">$3,240.00</p>
                                            </div>
                                            <div>
                                                <p className="text-white/80 text-sm">Loans made</p>
                                                <p className="font-medium">5</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button className="w-full" onClick={() => navigate(RouteEnum.BROWSE)}>Find a Loan</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Recent Activity */}
                        <div>
                            <Card className="border-none shadow-md h-full">
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Your latest account activity</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((item) => (
                                            <div key={item} className="flex items-center justify-between pb-4 border-b">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-muted p-2 rounded-full">
                                                        <CreditCard className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Transaction #{item}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {new Date(Date.now() - item * 86400000).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge variant={item % 2 ? "default" : "secondary"}>{item % 2 ? "Completed" : "Pending"}</Badge>
                                            </div>
                                        ))}
                                        <div className="flex justify-center w-full">
                                            <Button variant="outline" className="w-full" onClick={() => navigate(RouteEnum.TRANSACTION_HISTORY)}>View All</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

    )
}

