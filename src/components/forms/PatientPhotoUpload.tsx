import React, { useState, useRef } from 'react';
import { Camera, Upload, X, User } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface PatientPhotoUploadProps {
  value?: string | null;
  onChange: (photoUrl: string | null) => void;
  disabled?: boolean;
}

export const PatientPhotoUpload: React.FC<PatientPhotoUploadProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      setStream(mediaStream);
      setShowCameraModal(true);

      // Wait for modal to render, then set video stream
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Explicitly play the video
          videoRef.current.play().catch(err => {
            console.error('Error playing video:', err);
          });
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          toast.error('Camera permission denied. Please allow camera access in your browser settings.');
        } else if (error.name === 'NotFoundError') {
          toast.error('No camera found on this device.');
        } else {
          toast.error('Failed to access camera. Please check permissions.');
        }
      } else {
        toast.error('Failed to access camera. Please check permissions.');
      }
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCameraModal(false);
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');

      // Resize to max 400x400 to reduce size
      const maxSize = 400;
      let width = videoRef.current.videoWidth;
      let height = videoRef.current.videoHeight;

      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        // Compress to 0.6 quality (lower quality = smaller size)
        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.6);
        onChange(photoDataUrl);
        stopCamera();
        toast.success('Photo captured successfully!');
      }
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Compress and resize image before upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');

          // Resize to max 400x400
          const maxSize = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to 0.6 quality
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
            onChange(compressedDataUrl);
            toast.success('Photo uploaded and optimized!');
          }
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        toast.error('Failed to read image file');
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo
  const removePhoto = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Photo removed');
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '14px', color: '#333333', marginBottom: '6px', fontWeight: '500' }}>
        Patient Photo (Optional)
      </label>

      <div className="flex items-center gap-4">
        {/* Photo Preview */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '8px',
            border: '2px solid #CCCCCC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#F5F7FA',
          }}
        >
          {value ? (
            <img
              src={value}
              alt="Patient"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <User className="w-12 h-12" style={{ color: '#CCCCCC' }} />
          )}
        </div>

        {/* Upload Options */}
        <div className="flex flex-col gap-2">
          {/* Upload from Device */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: '#0056B3',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '600',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: disabled ? 0.6 : 1,
            }}
            onMouseEnter={(e) => !disabled && (e.currentTarget.style.backgroundColor = '#004494')}
            onMouseLeave={(e) => !disabled && (e.currentTarget.style.backgroundColor = '#0056B3')}
          >
            <Upload className="w-4 h-4" />
            Upload from Device
          </button>

          {/* Capture with Camera */}
          <button
            type="button"
            onClick={startCamera}
            disabled={disabled}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: '#0056B3',
              border: '2px solid #0056B3',
              fontWeight: '600',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: disabled ? 0.6 : 1,
            }}
            onMouseEnter={(e) => !disabled && (e.currentTarget.style.backgroundColor = '#F0F7FF')}
            onMouseLeave={(e) => !disabled && (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <Camera className="w-4 h-4" />
            Capture Live Photo
          </button>

          {/* Remove Photo */}
          {value && (
            <button
              type="button"
              onClick={removePhoto}
              disabled={disabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#EF4444',
                border: '2px solid #EF4444',
                fontWeight: '600',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                opacity: disabled ? 0.6 : 1,
              }}
              onMouseEnter={(e) => !disabled && (e.currentTarget.style.backgroundColor = '#FEF2F2')}
              onMouseLeave={(e) => !disabled && (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            >
              <X className="w-4 h-4" />
              Remove Photo
            </button>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {/* Camera Modal */}
      {showCameraModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '640px',
              width: '90%',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333333' }}>
                Capture Patient Photo
              </h3>
              <button
                onClick={stopCamera}
                style={{
                  padding: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#F5F5F5',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5E5E5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
              >
                <X className="w-5 h-5" style={{ color: '#333333' }} />
              </button>
            </div>

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                maxHeight: '480px',
                borderRadius: '8px',
                backgroundColor: '#000000',
                marginBottom: '16px',
                display: 'block',
              }}
              onLoadedMetadata={(e) => {
                // Ensure video plays when metadata is loaded
                const video = e.target as HTMLVideoElement;
                video.play().catch(err => console.error('Play error:', err));
              }}
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={stopCamera}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#E0E0E0',
                  color: '#333333',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D0D0D0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E0E0E0')}
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#0056B3',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#004494')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0056B3')}
              >
                <Camera className="w-5 h-5 inline mr-2" />
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
