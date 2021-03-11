import { Flex, Link } from "@chakra-ui/react";

interface FeedbackLinkProps {
  siteId: string;
}

const FeedbackLink: React.FC<FeedbackLinkProps> = ({ siteId }) => {
  return (
    <Flex justifyContent="space-between" mb={8} width="full" mt={1}>
      <Link fontWeight="bold" fontSize="sm" href={`site/${siteId}`}>
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by Fast Feedback
      </Link>
    </Flex>
  );
};

export default FeedbackLink;
