import { IUser } from "@/app/(withDashboardLayout)/news-feed/page";
import ReactModal from "react-modal";

const FollowingModal: React.FC<{ isOpen: boolean; onRequestClose: () => void; following: IUser[] }> = ({ isOpen, onRequestClose, following }) => {
    return (
      <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} className="bg-white theme-bg rounded-lg p-8 w-full shadow-xl max-w-md mx-auto"
      overlayClassName="modal-overlay"
      ariaHideApp={false}>
        <h2 className="text-xl font-bold mb-4">Following</h2>
        <div className="space-y-4">
          {following.map((follow, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={follow.image} // You can replace with actual following profile image
                height={40}
                width={40}
                alt="following profile"
                className="rounded-full w-10 h-10  object-cover"
              />
              <div>
                <p className="font-semibold">{follow.name}</p>
                <p className="text-sm text-gray-500">You are Following</p> {/* You can replace with actual title */}
              </div>
            </div>
          ))}
        </div>
      </ReactModal>
    );
  };
  
  export default FollowingModal