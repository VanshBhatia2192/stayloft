
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, CheckCircle, AlertCircle, Clock, Shield } from "lucide-react";
import { VerificationStatus } from "@/types";

const VerificationTab = () => {
  // Mock verification data - in a real app, this would come from API calls
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("PENDING");
  const [documents, setDocuments] = useState([
    { 
      id: "1", 
      type: "ID_CARD" as const, 
      status: "VERIFIED" as VerificationStatus, 
      fileName: "aadhar_card.jpg", 
      uploadedAt: new Date(2025, 3, 10) 
    },
    { 
      id: "2", 
      type: "ADDRESS_PROOF" as const, 
      status: "PENDING" as VerificationStatus, 
      fileName: "electricity_bill.pdf", 
      uploadedAt: new Date(2025, 3, 15) 
    }
  ]);
  
  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "VERIFIED":
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Verified</span>
          </div>
        );
      case "PENDING":
        return (
          <div className="flex items-center text-amber-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Under Review</span>
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  const handleUploadDocument = (type: string) => {
    // In a real app, you would implement document upload functionality
    console.log(`Uploading document of type: ${type}`);
  };
  
  const getVerificationGuide = () => {
    return (
      <div className="space-y-4 mt-6">
        <h3 className="font-medium text-lg">Verification Guide</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <span className="font-bold">1</span>
            </div>
            <div>
              <p className="font-medium">Submit Clear Documents</p>
              <p className="text-muted-foreground">
                Upload clear, unedited scans or photos of your original documents. All text must be clearly visible.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <span className="font-bold">2</span>
            </div>
            <div>
              <p className="font-medium">Verification Time</p>
              <p className="text-muted-foreground">
                Document verification typically takes 24-48 hours to complete.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <span className="font-bold">3</span>
            </div>
            <div>
              <p className="font-medium">Stay Updated</p>
              <p className="text-muted-foreground">
                You'll receive an email notification once your documents have been reviewed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>
                Verify your identity to unlock full account features
              </CardDescription>
            </div>
            {getStatusBadge(verificationStatus)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">ID Proof (Required)</p>
                  <p className="text-sm text-muted-foreground">
                    Upload a government-issued ID card, passport, or driver's license
                  </p>
                </div>
              </div>
              
              {documents.find(doc => doc.type === "ID_CARD") ? (
                <div className="text-right">
                  <p className="text-sm font-medium">{documents.find(doc => doc.type === "ID_CARD")?.fileName}</p>
                  <div className="mt-1">
                    {getStatusBadge(documents.find(doc => doc.type === "ID_CARD")?.status || "PENDING")}
                  </div>
                </div>
              ) : (
                <Button variant="outline" onClick={() => handleUploadDocument("ID_CARD")}>
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Address Proof (Required)</p>
                  <p className="text-sm text-muted-foreground">
                    Upload a utility bill, bank statement, or rental agreement
                  </p>
                </div>
              </div>
              
              {documents.find(doc => doc.type === "ADDRESS_PROOF") ? (
                <div className="text-right">
                  <p className="text-sm font-medium">{documents.find(doc => doc.type === "ADDRESS_PROOF")?.fileName}</p>
                  <div className="mt-1">
                    {getStatusBadge(documents.find(doc => doc.type === "ADDRESS_PROOF")?.status || "PENDING")}
                  </div>
                </div>
              ) : (
                <Button variant="outline" onClick={() => handleUploadDocument("ADDRESS_PROOF")}>
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              )}
            </div>
          </div>
          
          {getVerificationGuide()}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Benefits of Verification</CardTitle>
          <CardDescription>
            Verified accounts enjoy enhanced features and trustworthiness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="font-medium">Increased Trust</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Property owners prefer verified tenants, increasing your chances of booking acceptance.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="font-medium">Faster Approvals</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Verified accounts get faster booking approvals from property owners.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="font-medium">Verified Badge</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Your profile will display a verification badge, building trust with property owners.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="font-medium">Enhanced Security</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Creates a safer community for all StayLoft users with verified identities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationTab;
