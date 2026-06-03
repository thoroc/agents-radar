import { describe, expect, it } from "vitest";
import type { RepoConfig, RepoFetch } from "../github";
import { classifyFetchResults } from "./classify-fetch-results";

const makeConfig = (id: string): RepoConfig => ({ id }) as RepoConfig;
const makeFetch = (id: string): RepoFetch => ({ cfg: makeConfig(id) }) as RepoFetch;

describe("classifyFetchResults", () => {
  const openclaw = makeConfig("openclaw");
  const peer1 = makeConfig("peer1");
  const peer2 = makeConfig("peer2");

  it("separates CLI repos from openclaw and peers", () => {
    const fetched = [
      makeFetch("cli1"),
      makeFetch("openclaw"),
      makeFetch("peer1"),
      makeFetch("cli2"),
      makeFetch("peer2"),
    ];
    const { fetchedCli } = classifyFetchResults(fetched, openclaw, [peer1, peer2]);
    expect(fetchedCli).toHaveLength(2);
    expect(fetchedCli.map((f) => f.cfg.id)).toEqual(["cli1", "cli2"]);
  });

  it("identifies the openclaw repo", () => {
    const fetched = [makeFetch("cli1"), makeFetch("openclaw")];
    const { fetchedOpenclaw } = classifyFetchResults(fetched, openclaw, []);
    expect(fetchedOpenclaw.cfg.id).toBe("openclaw");
  });

  it("identifies peer repos", () => {
    const fetched = [makeFetch("cli1"), makeFetch("peer1"), makeFetch("peer2")];
    const { fetchedPeers } = classifyFetchResults(fetched, openclaw, [peer1, peer2]);
    expect(fetchedPeers).toHaveLength(2);
    expect(fetchedPeers.map((f) => f.cfg.id)).toEqual(["peer1", "peer2"]);
  });

  it("returns empty arrays when no CLI or peer repos present", () => {
    const fetched = [makeFetch("openclaw")];
    const { fetchedCli, fetchedPeers } = classifyFetchResults(fetched, openclaw, []);
    expect(fetchedCli).toHaveLength(0);
    expect(fetchedPeers).toHaveLength(0);
  });

  it("excludes openclaw from CLI results even with no peers", () => {
    const fetched = [makeFetch("cli1"), makeFetch("openclaw")];
    const { fetchedCli } = classifyFetchResults(fetched, openclaw, []);
    expect(fetchedCli.map((f) => f.cfg.id)).toEqual(["cli1"]);
  });
});
