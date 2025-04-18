
import { useState } from "react";
import { ShieldCheck, Upload, Clock, XCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, VerificationDocument, VerificationStatus } from "@/types";

const VerificationTab = () => {
  const [uploading, setUploading] = useState(false);
  
  // Mock user data - in a real app, this would come from API calls
  const user: User = {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 123-456-7890",
    role: "TENANT",
    createdAt: new Date(),
    updatedAt: new Date(),
    theme: "system",
    notifications: {
      email: true,
      push: true,
      sms: false,
      newMessages: true,
      bookingUpdates: true,
      paymentReminders: true,
      promotions: false
    },
    verificationStatus: "PENDING"
  };
  
  // Mock verification documents - in a real app, this would come from API calls
  const documents: VerificationDocument[] = [
    {
      id: "1",
      userId: "1",
      type: "ID_CARD",
      fileUrl: "https://example.com/id-card.pdf",
      status: "VERIFIED",
      uploadedAt: new Date(Date.now() - 604800000), // 7 days ago
      verifiedAt: new Date(Date.now() - 259200000) // 3 days ago
    },
    {
      id: "2",
      userId: "1",
      type: "ADDRESS_PROOF",
      fileUrl: "https://example.com/address-proof.pdf",
      status: "PENDING",
      uploadedAt: new Date(Date.now() - 259200000) // 3 days ago
    }
  ];
  
  const pendingDocumentTypes = ["PASSPORT", "DRIVERS_LICENSE"].filter(
    type => !documents.find(doc => doc.type === type)
  );
  
  const getVerificationProgress = () => {
    const totalDocs = 4; // ID, Passport, Driver's License, Address Proof
    const verifiedDocs = documents.filter(doc => doc.status === "VERIFIED").length;
    return (verifiedDocs / totalDocs) * 100;
  };
  
  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Under Review
          </Badge>
        );
      case "VERIFIED":
        return (
          <Badge variant="outline" className="border-green-500 text-green-600 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="border-red-500 text-red-600 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "ID_CARD": return "Government ID Card";
      case "PASSPORT": return "Passport";
      case "DRIVERS_LICENSE": return "Driver's License";
      case "ADDRESS_PROOF": return "Address Proof";
      default: return type;
    }
  };
  
  const uploadDocument = (type: string) => {
    setUploading(true);
    // In a real app, you would handle the file upload
    setTimeout(() => {
      setUploading(false);
      console.log(`Uploaded document: ${type}`);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Identity Verification</h2>
          <p className="text-gray-500 mt-1">Verify your identity to build trust with property owners</p>
        </div>
        <div className="flex items-center">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          {getStatusBadge(user.verificationStatus)}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-gray-500">Verification Progress</span>
          <span className="font-medium">{Math.round(getVerificationProgress())}% Complete</span>
        </div>
        <Progress value={getVerificationProgress()} className="h-2" />
      </div>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-medium mb-4">Uploaded Documents</h3>
          
          {documents.length > 0 ? (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{getDocumentTypeLabel(doc.type)}</p>
                      <p className="text-xs text-gray-500">Uploaded on {doc.uploadedAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  {getStatusBadge(doc.status)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
          )}
        </div>
        
        {pendingDocumentTypes.length > 0 && (
          <div>
            <h3 className="font-medium mb-4">Required Documents</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {pendingDocumentTypes.map((type) => (
                <div key={type} className="border p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <h4 className="font-medium">{getDocumentTypeLabel(type)}</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload a clear copy of your {getDocumentTypeLabel(type).toLowerCase()} for verification.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled={uploading}
                    onClick={() => uploadDocument(type)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Document"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Why verify your identity?</h4>
              <p className="text-sm text-gray-600">
                Verified users are more likely to get their bookings approved by property owners.
                Your documents are securely stored and will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;
