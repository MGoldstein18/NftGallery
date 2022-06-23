import {
  Button,
  VStack,
  Box,
  Image,
  Text,
  Divider,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';

const NftCard = ({
  nft
}: {
  nft: {
    media: { gateway: string }[];
    title: string;
    id: { tokenId: string };
    contract: { address: string };
    description: string;
  };
}) => {
  return (
    <Box p='2rem' shadow='md' borderWidth='3px'>
      <Image height={'50%'} src={nft.media[0].gateway} />

      <Text fontWeight={'bold'} fontSize={'20px'} mt='1rem'>
        {nft.title}
      </Text>
      <Divider />
      <Stack height='30%'>
        <Popover>
          <PopoverTrigger>
            <Text _hover={{ color: 'skyblue', fontWeight: 'bold' }}>
              <b>ID: </b>
              {nft.id.tokenId.substring(nft.id.tokenId.length - 4)}{' '}
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight={'bold'}>Full ID</PopoverHeader>
            <PopoverBody>{nft.id.tokenId}</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Text _hover={{ color: 'skyblue', fontWeight: 'bold' }}>
              <b>Contract: </b>
              {`${nft.contract.address.substring(
                0,
                4
              )}...${nft.contract.address.substring(
                nft.contract.address.length - 4
              )}`}
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight={'bold'}>Full Address</PopoverHeader>
            <PopoverBody>{nft.contract.address}</PopoverBody>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Text _hover={{ color: 'skyblue', fontWeight: 'bold' }}>
              <b>Description: </b>
              {nft.description?.substring(0, 150)}
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight={'bold'}>Full Description</PopoverHeader>
            <PopoverBody>{nft.description}</PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      <VStack mt='2rem'>
        <Button>
          <a
            target={'_blank'}
            href={`https://etherscan.io/token/${nft.contract.address}`}
          >
            View on etherscan
          </a>
        </Button>
      </VStack>
    </Box>
  );
};

export default NftCard;
