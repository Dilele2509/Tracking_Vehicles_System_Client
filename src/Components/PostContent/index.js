import React, { useState } from 'react';
import './PostContent.css';

function PostContent({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <div>
      <p className="post-content">
        {isExpanded ? (
          // Hiển thị nội dung đầy đủ khi mở rộng
          content.split('. ').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < content.split('. ').length - 1 && <br />}
            </React.Fragment>
          ))
        ) : (
          // Hiển thị nội dung bị rút gọn
          truncatedContent
        )}
      </p>
      {content.length > 100 && (
        <button className='read-more-btn' onClick={handleToggle}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default PostContent;
