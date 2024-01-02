import { css } from '@emotion/react';

const listStyles = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const listItemStyles = css`
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const MyList = ({ items }) => {
  return (
    <ul css={listStyles}>
      {items.map((item, index) => (
        <li key={index} css={listItemStyles}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default MyList;