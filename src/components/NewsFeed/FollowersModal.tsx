import { IUser } from "@/app/(withDashboardLayout)/news-feed/page";
import ReactModal from "react-modal";

const FollowersModal: React.FC<{ isOpen: boolean; onRequestClose: () => void; followers: IUser[] }> = ({ isOpen, onRequestClose, followers }) => {

  console.log(followers);
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}  className="bg-white theme-bg rounded-lg p-8 w-full shadow-xl max-w-md mx-auto"
    overlayClassName="modal-overlay"
    ariaHideApp={false}>
      <h2 className="text-xl font-bold mb-4">Followers</h2>
      <div className="space-y-4">
        {followers.map((follower, index) => (
          <div key={index} className="flex items-center gap-3">
            <img
              src={follower.image} 
              height={40}
              width={40}
              alt="follower profile"
              className="rounded-full w-10 h-10  object-cover"
            />
            <div>
              <p className="font-semibold">{follower.name}</p>
              <p className="text-sm text-gray-500">Following You</p> 
            </div>
          </div>
        ))}
      </div>
    </ReactModal>
  );
};

export default FollowersModal