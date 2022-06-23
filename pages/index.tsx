import {
  Button,
  FormControl,
  Heading,
  Input,
  VStack,
  FormLabel,
  Switch,
  HStack,
  SimpleGrid,
  Divider,
  Text
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import NftCard from '../components/NftCard';

const Home: NextPage = () => {
  const [wallet, setWallet] = useState('');
  const [collection, setCollection] = useState('');
  const [NFTs, setNFTs] = useState<any[]>([]);
  const [fetchByCollection, setFetchByCollection] = useState(false);

  const handleWalletChange = (e: any) => {
    setWallet(e.target.value);
  };

  const handleCollectionChange = (e: any) => {
    setCollection(e.target.value);
  };

  const handleCheckedChange = (e: any) => {
    setFetchByCollection(e.target.checked);
  };

  const fetchNfts = async () => {
    let nfts;
    const baseUrl = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs/`;

    const requestOptions = {
      method: 'GET'
    };

    try {
      if (!collection.length) {
        const fetchUrl = `${baseUrl}?owner=${wallet}`;
        nfts = await fetch(fetchUrl, requestOptions).then((data) =>
          data.json()
        );
      } else {
        const fetchUrl = `${baseUrl}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
        nfts = await fetch(fetchUrl, requestOptions).then((data) => {
          console.log('data', data);
          console.log('json', data.json())
          return data.json();
        });
      }
    } catch (error) {
      console.error(error);
    }

    if (nfts) {
      console.log('nfts:', nfts);
      setNFTs(nfts.ownedNfts);
    }

    setWallet('');
    setCollection('');
  };

  const fetchNftsByCollection = async () => {
    if (!collection.length) {
      alert('Please add a collection address!');
      return 'No collection address';
    }

    const requestOptions = {
      method: 'GET'
    };

    const baseUrl = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection/`;
    const fetchUrl = `${baseUrl}?contractAddress=${collection}&withMetadata=${'true'}`;

    const nfts = await fetch(fetchUrl, requestOptions).then((data) =>
      data.json()
    );

    if (nfts) {
      console.log('nfts:', nfts);
      setNFTs(nfts.nfts);
    }

    setWallet('');
    setCollection('');
  };

  return (
    <VStack spacing={'5'} m='3rem'>
      <Heading m='2rem'>Search for NFTs</Heading>
      <VStack width={'100%'} spacing={'5'}>
        <FormControl width={'50%'}>
          <Input
            variant={'filled'}
            disabled={fetchByCollection}
            onChange={handleWalletChange}
            value={wallet}
            type={'text'}
            placeholder='Wallet address'
          ></Input>
        </FormControl>
        <FormControl width={'50%'}>
          {' '}
          <Input
            variant={'filled'}
            onChange={handleCollectionChange}
            value={collection}
            type={'text'}
            placeholder='Collection address'
          ></Input>
        </FormControl>
        <HStack textAlign={'center'} width={'50%'}>
          <Switch onChange={handleCheckedChange} />
          <FormLabel textAlign={'center'}>Fetch by collection only</FormLabel>
        </HStack>
        <Button
          w='50%'
          size={'lg'}
          colorScheme={'purple'}
          onClick={fetchByCollection ? fetchNftsByCollection : fetchNfts}
        >
          Search
        </Button>
      </VStack>
      <Divider />
      <VStack>
        <Heading m='3rem'>NFT Gallery</Heading>
        {NFTs.length > 0 ? (
          <SimpleGrid margin={'3rem'} spacing={5} columns={3}>
            {NFTs.length &&
              NFTs.map((nft) => {
                return <NftCard key={NFTs.indexOf(nft)} nft={nft}></NftCard>;
              })}
          </SimpleGrid>
        ) : (
          <VStack textAlign={'center'}>
            <Text fontStyle={'italic'}>
              Your search results will be displayed here...
            </Text>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export default Home;
