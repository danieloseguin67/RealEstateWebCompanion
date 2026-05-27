<!-- Source: https://github.com/revive-adserver/revive-adserver/tree/master/www/api/v2/xmlrpc -->
<!-- Source: https://www.reviveadserverrestapi.com/api-documentation/ (JS-rendered — partial info) -->
<!-- Source: https://github.com/Artistan/Revive-XmlRpc -->

# Revive Adserver API Reference

## Built-in XML-RPC v2 API

**Endpoint**: `https://{your-server}/api/v2/xmlrpc/`
**Protocol**: XML-RPC
**Auth**: Pass username and password as the first two parameters to `ox.logon`, receive a sessionId. Pass sessionId as the first parameter to all subsequent calls.
**Compatibility**: Revive Adserver v4.x, v5.x, v6.x

### Authentication

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.logon` | username (string), password (string) | sessionId (string) |
| `ox.logoff` | sessionId (string) | boolean |

### Advertiser Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addAdvertiser` | sessionId, advertiserInfo (struct) | advertiserId (int) |
| `ox.modifyAdvertiser` | sessionId, advertiserInfo (struct) | boolean |
| `ox.deleteAdvertiser` | sessionId, advertiserId (int) | boolean |
| `ox.getAdvertiser` | sessionId, advertiserId (int) | advertiserInfo (struct) |
| `ox.getAdvertiserListByAgencyId` | sessionId, agencyId (int) | array of advertiserInfo |
| `ox.advertiserDailyStatistics` | sessionId, advertiserId, startDate, endDate | array of stats |
| `ox.advertiserHourlyStatistics` | sessionId, advertiserId, startDate, endDate | array of stats |
| `ox.advertiserCampaignStatistics` | sessionId, advertiserId, startDate, endDate | array of stats |
| `ox.advertiserBannerStatistics` | sessionId, advertiserId, startDate, endDate | array of stats |
| `ox.advertiserPublisherStatistics` | sessionId, advertiserId, startDate, endDate | array of stats |
| `ox.advertiserZoneStatistics` | sessionId, advertiserId, startDate, endDate | array of stats |

### Agency Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addAgency` | sessionId, agencyInfo (struct) | agencyId (int) |
| `ox.modifyAgency` | sessionId, agencyInfo (struct) | boolean |
| `ox.deleteAgency` | sessionId, agencyId (int) | boolean |
| `ox.getAgency` | sessionId, agencyId (int) | agencyInfo (struct) |
| `ox.getAgencyList` | sessionId | array of agencyInfo |
| `ox.agencyDailyStatistics` | sessionId, agencyId, startDate, endDate | array of stats |
| `ox.agencyHourlyStatistics` | sessionId, agencyId, startDate, endDate | array of stats |
| `ox.agencyAdvertiserStatistics` | sessionId, agencyId, startDate, endDate | array of stats |
| `ox.agencyCampaignStatistics` | sessionId, agencyId, startDate, endDate | array of stats |
| `ox.agencyBannerStatistics` | sessionId, agencyId, startDate, endDate | array of stats |
| `ox.agencyPublisherStatistics` | sessionId, agencyId, startDate, endDate | array of stats |
| `ox.agencyZoneStatistics` | sessionId, agencyId, startDate, endDate | array of stats |

### Banner Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addBanner` | sessionId, bannerInfo (struct) | bannerId (int) |
| `ox.modifyBanner` | sessionId, bannerInfo (struct) | boolean |
| `ox.deleteBanner` | sessionId, bannerId (int) | boolean |
| `ox.getBanner` | sessionId, bannerId (int) | bannerInfo (struct) |
| `ox.getBannerListByCampaignId` | sessionId, campaignId (int) | array of bannerInfo |
| `ox.getBannerTargeting` | sessionId, bannerId (int) | array of targetingInfo |
| `ox.setBannerTargeting` | sessionId, bannerId (int), targetingInfo (array) | boolean |
| `ox.bannerDailyStatistics` | sessionId, bannerId, startDate, endDate | array of stats |
| `ox.bannerHourlyStatistics` | sessionId, bannerId, startDate, endDate | array of stats |
| `ox.bannerPublisherStatistics` | sessionId, bannerId, startDate, endDate | array of stats |
| `ox.bannerZoneStatistics` | sessionId, bannerId, startDate, endDate | array of stats |

### Campaign Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addCampaign` | sessionId, campaignInfo (struct) | campaignId (int) |
| `ox.modifyCampaign` | sessionId, campaignInfo (struct) | boolean |
| `ox.deleteCampaign` | sessionId, campaignId (int) | boolean |
| `ox.getCampaign` | sessionId, campaignId (int) | campaignInfo (struct) |
| `ox.getCampaignListByAdvertiserId` | sessionId, advertiserId (int) | array of campaignInfo |
| `ox.campaignDailyStatistics` | sessionId, campaignId, startDate, endDate | array of stats |
| `ox.campaignHourlyStatistics` | sessionId, campaignId, startDate, endDate | array of stats |
| `ox.campaignBannerStatistics` | sessionId, campaignId, startDate, endDate | array of stats |
| `ox.campaignPublisherStatistics` | sessionId, campaignId, startDate, endDate | array of stats |
| `ox.campaignZoneStatistics` | sessionId, campaignId, startDate, endDate | array of stats |
| `ox.campaignConversionStatistics` | sessionId, campaignId, startDate, endDate | array of stats |

### Channel Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addChannel` | sessionId, channelInfo (struct) | channelId (int) |
| `ox.modifyChannel` | sessionId, channelInfo (struct) | boolean |
| `ox.deleteChannel` | sessionId, channelId (int) | boolean |
| `ox.getChannel` | sessionId, channelId (int) | channelInfo (struct) |
| `ox.getChannelListByAgencyId` | sessionId, agencyId (int) | array of channelInfo |
| `ox.getChannelListByWebsiteId` | sessionId, websiteId (int) | array of channelInfo |
| `ox.getChannelTargeting` | sessionId, channelId (int) | array of targetingInfo |
| `ox.setChannelTargeting` | sessionId, channelId (int), targetingInfo (array) | boolean |

### Publisher Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addPublisher` | sessionId, publisherInfo (struct) | publisherId (int) |
| `ox.modifyPublisher` | sessionId, publisherInfo (struct) | boolean |
| `ox.deletePublisher` | sessionId, publisherId (int) | boolean |
| `ox.getPublisher` | sessionId, publisherId (int) | publisherInfo (struct) |
| `ox.getPublisherListByAgencyId` | sessionId, agencyId (int) | array of publisherInfo |
| `ox.publisherDailyStatistics` | sessionId, publisherId, startDate, endDate | array of stats |
| `ox.publisherHourlyStatistics` | sessionId, publisherId, startDate, endDate | array of stats |
| `ox.publisherAdvertiserStatistics` | sessionId, publisherId, startDate, endDate | array of stats |
| `ox.publisherCampaignStatistics` | sessionId, publisherId, startDate, endDate | array of stats |
| `ox.publisherBannerStatistics` | sessionId, publisherId, startDate, endDate | array of stats |
| `ox.publisherZoneStatistics` | sessionId, publisherId, startDate, endDate | array of stats |

### Tracker Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addTracker` | sessionId, trackerInfo (struct) | trackerId (int) |
| `ox.modifyTracker` | sessionId, trackerInfo (struct) | boolean |
| `ox.deleteTracker` | sessionId, trackerId (int) | boolean |
| `ox.getTracker` | sessionId, trackerId (int) | trackerInfo (struct) |
| `ox.getTrackerListByAccountId` | sessionId, accountId (int) | array of trackerInfo |

### User Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addUser` | sessionId, userInfo (struct) | userId (int) |
| `ox.modifyUser` | sessionId, userInfo (struct) | boolean |
| `ox.deleteUser` | sessionId, userId (int) | boolean |
| `ox.getUser` | sessionId, userId (int) | userInfo (struct) |
| `ox.getUserListByAccountId` | sessionId, accountId (int) | array of userInfo |
| `ox.updateSsoUserId` | sessionId, oldSsoUserId, newSsoUserId | boolean |
| `ox.updateUserEmailBySsoId` | sessionId, ssoUserId, email | boolean |

### Variable Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addVariable` | sessionId, variableInfo (struct) | variableId (int) |
| `ox.modifyVariable` | sessionId, variableInfo (struct) | boolean |
| `ox.deleteVariable` | sessionId, variableId (int) | boolean |
| `ox.getVariable` | sessionId, variableId (int) | variableInfo (struct) |
| `ox.getVariableListByTrackerId` | sessionId, trackerId (int) | array of variableInfo |

### Zone Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.addZone` | sessionId, zoneInfo (struct) | zoneId (int) |
| `ox.modifyZone` | sessionId, zoneInfo (struct) | boolean |
| `ox.deleteZone` | sessionId, zoneId (int) | boolean |
| `ox.getZone` | sessionId, zoneId (int) | zoneInfo (struct) |
| `ox.getZoneListByPublisherId` | sessionId, publisherId (int) | array of zoneInfo |
| `ox.linkBanner` | sessionId, zoneId (int), bannerId (int) | boolean |
| `ox.linkCampaign` | sessionId, zoneId (int), campaignId (int) | boolean |
| `ox.unlinkBanner` | sessionId, zoneId (int), bannerId (int) | boolean |
| `ox.unlinkCampaign` | sessionId, zoneId (int), campaignId (int) | boolean |
| `ox.generateTags` | sessionId, zoneId (int), tagType (string) | string (HTML tag code) |
| `ox.zoneDailyStatistics` | sessionId, zoneId, startDate, endDate | array of stats |
| `ox.zoneHourlyStatistics` | sessionId, zoneId, startDate, endDate | array of stats |
| `ox.zoneAdvertiserStatistics` | sessionId, zoneId, startDate, endDate | array of stats |
| `ox.zoneCampaignStatistics` | sessionId, zoneId, startDate, endDate | array of stats |
| `ox.zoneBannerStatistics` | sessionId, zoneId, startDate, endDate | array of stats |

### Display API

| Method | Parameters | Returns |
|--------|-----------|---------|
| `ox.view` | zone (string), campaignid (int), target (string), source (string), withText (0\|1), context (array), charset (string) | ad HTML (string) |

### Statistics response format

All statistics methods return arrays of structs:

```
Daily: { day: date, requests: int, impressions: int, clicks: int, revenue: float }
Hourly: { day: date, hour: int, requests: int, impressions: int, clicks: int, revenue: float }
Entity: adds entity fields (advertiserId, advertiserName, campaignId, etc.)
```

## Third-party REST API plugin

**Source**: reviveadserverrestapi.com (paid plugin)
**Latest version**: v5.2.0 (April 2024)
**Auth**: Base64 `user:password` in Authorization header
**Format**: JSON
**Compatibility**: Revive v4.x, v5.x, v6.0

Provides the same management and statistics functions as the XML-RPC API but via RESTful HTTP endpoints. Documentation at reviveadserverrestapi.com/api-documentation/ (JS-rendered).

## PHP wrapper packages

| Package | Packagist | Notes |
|---------|-----------|-------|
| tafoyaventures/revive-xmlrpc | packagist.org/packages/tafoyaventures/revive-xmlrpc | Maintained fork |
| szeidler/revive-xmlrpc | packagist.org/packages/szeidler/revive-xmlrpc | Alternative fork |
