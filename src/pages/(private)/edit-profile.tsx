import { useState, useRef } from "react";
import Webcam from "react-webcam"; 
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userDto, userSchema } from "@/lib/model/dto/edit-user.dto";
import { UserService } from "@/services/user.service";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const userService = new UserService();

export const EditProfilePage = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            dob: "",
            nationality: "",
            gender: "Other",
            email: "",
        },
    });

    
    const [step, setStep] = useState(1); 

    
    const webcamRef = useRef<Webcam | null>(null);
    const [capturedFace, setCapturedFace] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    
    const captureFace = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot(); 
            setCapturedFace(imageSrc);
        }
    };

    
    const handleUserInfoSubmit = async (values: userDto) => {
        setStep(2); 
    };

    
    const handleFinalSubmit = async () => {
        setLoading(true);
        try {
        let faceEncoding: [] | [Uint8Array] = []; 

        if (capturedFace) {
            
            const response = await fetch("http://127.0.0.1:5000/encode-face", {
                method: "POST",
                body: JSON.stringify({ image: capturedFace }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (data.success) {
                faceEncoding = [new Uint8Array(data.encoding)]; 
            }
        }
        const user = await userService.me();

        const userValues = form.getValues();
        await userService.editUser({ ...userValues,internetIdentity: user.internetIdentity, faceEncoding });
        navigate('/temp');
    } catch (err) {
        console.error("Error updating profile:", err);
    }
        setLoading(false);
    };

    return (
        <Form {...form}>
            {step === 1 && (
                <form onSubmit={form.handleSubmit(handleUserInfoSubmit)}>
                    {/* Username */}
                    <FormField 
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Date of Birth */}
                    <FormField 
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Nationality */}
                    <FormField 
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nationality</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nationality" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Gender Selection */}
                    <FormField 
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full p-2 border border-gray-300 rounded">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Next Button to Face Capture */}
                    <Button type="submit" className="mt-4"> Next → Face Capture </Button>
                </form>
            )}

            {/* Step 2: Face Capture */}
            {step === 2 && (
                <div className="text-center">
                    <h2>Step 2: Face Capture</h2>
                    <Webcam ref={webcamRef} screenshotFormat="image/png" />
                    <br />

                    <Button type="button" onClick={captureFace} className="mt-2">
                        Capture Face
                    </Button>

                    {/* Display Captured Face */}
                    {capturedFace && (
                        <div className="mt-4">
                            <h3>Captured Face Preview:</h3>
                            <img src={capturedFace} alt="Captured Face" style={{ maxWidth: "200px" }} />
                        </div>
                    )}

                    {/* Submit Final Data */}
                    <Button 
                        type="button" 
                        onClick={handleFinalSubmit} 
                        className="mt-4"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Profile"}
                    </Button>
                </div>
            )}
        </Form>
    );
};
