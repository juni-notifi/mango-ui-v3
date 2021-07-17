import styled from '@emotion/styled'
// import { MenuAlt1Icon } from '@heroicons/react/solid'
// import useLocalStorageState from '../hooks/useLocalStorageState'
import useMangoGroupConfig from '../hooks/useMangoGroupConfig'
import MarketMenuItem from './MarketMenuItem'

const StyledMarketTypeToggleWrapper = styled.div`
  background: rgba(255, 255, 255, 0.12);
`

const StyledArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid rgba(255, 255, 255, 0.12);
  padding-right: 0.5rem;
`

const MarketSelect = () => {
  // const [lastViewedMarket, setLastViewedMarket] = useLocalStorageState(
  //   'lastViewedMarket',
  //   { baseSymbol: 'BTC', kind: 'spot' }
  // )
  const groupConfig = useMangoGroupConfig()

  const markets = []
  const allMarkets = [...groupConfig.perpMarkets, ...groupConfig.spotMarkets]
  allMarkets.forEach((market) => {
    const base = market.name.slice(0, -5)
    const found = markets.find((b) => b.baseAsset === base)
    console.log(found)
    if (!found) {
      markets.push({ baseAsset: base, markets: [market] })
    } else {
      found.markets.push(market)
    }
  })

  return (
    <div className="bg-th-bkg-3 flex h-10">
      <StyledMarketTypeToggleWrapper className="flex items-center pl-6 md:pl-9 pr-1">
        {/* <MenuAlt1Icon className="h-5 w-5 text-th-fgd-1" /> */}
        <span className="text-th-fgd-3 text-xs">MARKETS</span>
      </StyledMarketTypeToggleWrapper>
      <StyledArrow />
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {markets
            .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset))
            .map((s) => (
              <MarketMenuItem
                key={s.baseAsset}
                linksArray={s.markets}
                menuTitle={s.baseAsset}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default MarketSelect
