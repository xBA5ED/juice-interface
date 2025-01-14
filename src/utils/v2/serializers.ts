import { BigNumber } from '@ethersproject/bignumber'
import {
  V2FundingCycleData,
  V2FundingCycleMetadata,
  V2FundAccessConstraint,
} from 'models/v2/fundingCycle'
import {
  permilleToPercent,
  permyriadToPercent,
  fromWad,
  percentToPermille,
  percentToPermyriad,
  parseWad,
} from 'utils/formatNumber'

export type SerializedV2FundingCycleMetadata = Record<
  keyof Omit<
    V2FundingCycleMetadata,
    | 'reservedRate'
    | 'redemptionRate'
    | 'ballotRedemptionRate'
    | 'dataSource'
    | 'version'
  >,
  boolean
> &
  Record<
    keyof Pick<
      V2FundingCycleMetadata,
      'reservedRate' | 'redemptionRate' | 'ballotRedemptionRate' | 'dataSource'
    >,
    string
  >

export type SerializedV2FundingCycleData = Record<
  keyof V2FundingCycleData,
  string
>

export type SerializedV2FundAccessConstraint = Record<
  keyof V2FundAccessConstraint,
  string
>

export const serializeV2FundingCycleMetadata = (
  fundingCycleMetadata: V2FundingCycleMetadata,
): SerializedV2FundingCycleMetadata => ({
  reservedRate: permyriadToPercent(fundingCycleMetadata.reservedRate),
  redemptionRate: permyriadToPercent(fundingCycleMetadata.redemptionRate),
  ballotRedemptionRate: permyriadToPercent(
    fundingCycleMetadata.ballotRedemptionRate,
  ),
  pausePay: fundingCycleMetadata.pausePay,
  pauseDistributions: fundingCycleMetadata.pauseDistributions,
  pauseRedeem: fundingCycleMetadata.pauseRedeem,
  pauseMint: fundingCycleMetadata.pauseMint,
  pauseBurn: fundingCycleMetadata.pauseBurn,
  allowChangeToken: fundingCycleMetadata.allowChangeToken,
  allowTerminalMigration: fundingCycleMetadata.allowTerminalMigration,
  allowControllerMigration: fundingCycleMetadata.allowControllerMigration,
  allowSetTerminals: fundingCycleMetadata.allowSetTerminals,
  allowSetController: fundingCycleMetadata.allowSetController,
  holdFees: fundingCycleMetadata.holdFees,
  useTotalOverflowForRedemptions:
    fundingCycleMetadata.useTotalOverflowForRedemptions,
  useDataSourceForPay: fundingCycleMetadata.useDataSourceForPay,
  useDataSourceForRedeem: fundingCycleMetadata.useDataSourceForRedeem,
  dataSource: fundingCycleMetadata.dataSource, // hex, contract address
})

export const deserializeV2FundingCycleMetadata = (
  serializedFundingCycleMetadata: SerializedV2FundingCycleMetadata,
): Omit<V2FundingCycleMetadata, 'version'> => ({
  reservedRate: percentToPermyriad(serializedFundingCycleMetadata.reservedRate),
  redemptionRate: percentToPermyriad(
    serializedFundingCycleMetadata.redemptionRate,
  ),
  ballotRedemptionRate: percentToPermyriad(
    serializedFundingCycleMetadata.ballotRedemptionRate,
  ),
  pausePay: serializedFundingCycleMetadata.pausePay,
  pauseDistributions: serializedFundingCycleMetadata.pauseDistributions,
  pauseRedeem: serializedFundingCycleMetadata.pauseRedeem,
  pauseMint: serializedFundingCycleMetadata.pauseMint,
  pauseBurn: serializedFundingCycleMetadata.pauseBurn,
  allowChangeToken: serializedFundingCycleMetadata.allowChangeToken,
  allowTerminalMigration: serializedFundingCycleMetadata.allowTerminalMigration,
  allowControllerMigration:
    serializedFundingCycleMetadata.allowControllerMigration,
  allowSetTerminals: serializedFundingCycleMetadata.allowSetTerminals,
  allowSetController: serializedFundingCycleMetadata.allowSetController,
  holdFees: serializedFundingCycleMetadata.holdFees,
  useTotalOverflowForRedemptions:
    serializedFundingCycleMetadata.useTotalOverflowForRedemptions,
  useDataSourceForPay: serializedFundingCycleMetadata.useDataSourceForPay,
  useDataSourceForRedeem: serializedFundingCycleMetadata.useDataSourceForRedeem,
  dataSource: serializedFundingCycleMetadata.dataSource, // hex, contract address
})

export const serializeV2FundingCycleData = (
  fundingCycleData: V2FundingCycleData,
): SerializedV2FundingCycleData => ({
  duration: fundingCycleData.duration.toString(),
  weight: fromWad(fundingCycleData.weight),
  discountRate: permilleToPercent(fundingCycleData.discountRate),
  ballot: fundingCycleData.ballot, // hex, contract address
})

export const deserializeV2FundingCycleData = (
  serializedFundingCycleData: SerializedV2FundingCycleData,
): V2FundingCycleData => ({
  duration: BigNumber.from(serializedFundingCycleData.duration || '0'),
  weight: parseWad(serializedFundingCycleData.weight),
  discountRate: percentToPermille(serializedFundingCycleData.discountRate),
  ballot: serializedFundingCycleData.ballot, // hex, contract address
})

export const serializeFundAccessConstraint = (
  fundAccessConstraint: V2FundAccessConstraint,
): SerializedV2FundAccessConstraint => {
  return {
    terminal: fundAccessConstraint.terminal,
    distributionLimit: fromWad(fundAccessConstraint.distributionLimit),
    distributionLimitCurrency:
      fundAccessConstraint.distributionLimitCurrency.toString(),
    overflowAllowance: fromWad(fundAccessConstraint.overflowAllowance),
    overflowAllowanceCurrency:
      fundAccessConstraint.overflowAllowanceCurrency.toString(),
  }
}

export const deserializeFundAccessConstraint = (
  fundAccessConstraint: SerializedV2FundAccessConstraint,
): V2FundAccessConstraint => {
  return {
    terminal: fundAccessConstraint.terminal,
    distributionLimit: parseWad(fundAccessConstraint.distributionLimit),
    distributionLimitCurrency: BigNumber.from(
      fundAccessConstraint.distributionLimitCurrency,
    ),
    overflowAllowance: parseWad(fundAccessConstraint.overflowAllowance),
    overflowAllowanceCurrency: BigNumber.from(
      fundAccessConstraint.overflowAllowanceCurrency.toString(),
    ),
  }
}
